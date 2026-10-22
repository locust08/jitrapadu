import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { withTestPayload } from './fixtures.ts'
import { handleContact } from '../../src/cms/contact-handler.ts'
const input = { fullName: 'PRIVATE_PERSON', email: 'private@example.test', message: 'PRIVATE_PROJECT_MESSAGE', consent: true }
const origin = 'http://localhost:3001'
const request = (data: unknown = input, key: string = randomUUID(), headers: Record<string, string> = {}) => new Request(origin + '/api/contact', { method: 'POST', body: JSON.stringify(data), headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': key, ...headers } })

test('contact handler stores once and gives generic receipt even when notification unavailable', () => withTestPayload(async payload => {
  const deps = { payload, allowedOrigins: new Set([origin]), transport: null }
  const key: string = randomUUID()
  const first = await handleContact(request(input, key), deps)
  assert.equal(first.status, 202); assert.equal(first.headers.get('Cache-Control'), 'no-store')
  assert.deepEqual(await first.json(), { message: 'Thank you. Your enquiry has been received.' })
  const retry = await handleContact(request({ ...input, email: ' PRIVATE@EXAMPLE.TEST ' }, key), deps)
  assert.equal(retry.status, 202); assert.equal((await payload.count({ collection: 'enquiries' })).totalDocs, 1)
  assert.equal((await handleContact(request({ ...input, message: 'Different message' }, key), deps)).status, 409)
  assert.equal((await handleContact(request({ ...input, website: 'bot' }), deps)).status, 202)
  assert.equal((await payload.count({ collection: 'enquiries' })).totalDocs, 1)
  assert.equal((await payload.find({ collection: 'enquiries' })).docs[0].notificationStatus, 'not-configured')
  const failed = await handleContact(request({ ...input, email: 'second@example.test' }), { ...deps, transport: { async send() { throw new Error('RAW_PRIVATE_ERROR') } } })
  assert.equal(failed.status, 202)
  assert.equal((await payload.find({ collection: 'enquiries', where: { email: { equals: 'second@example.test' } } })).docs[0].notificationStatus, 'failed')
}))

test('contact handler maps safe errors and enforces limits with Retry-After', () => withTestPayload(async payload => {
  const deps = { payload, allowedOrigins: new Set([origin]), transport: null }
  const cases = [
    [request(input, 'bad'), 400], [request(input, randomUUID(), { Origin: 'https://evil.test' }), 403],
    [request({ ...input, message: 'x'.repeat(17000) }), 413], [request(input, randomUUID(), { 'Content-Type': 'text/plain' }), 415],
    [request({ ...input, consent: false }), 422],
  ] as const
  for (const [req, expected] of cases) {
    const response = await handleContact(req, deps)
    assert.equal(response.status, expected)
    const json = JSON.stringify(await response.json())
    for (const secret of [input.fullName, input.email, input.message]) assert.equal(json.includes(secret), false)
  }
  for (let i = 0; i < 5; i++) assert.equal((await handleContact(request(), deps)).status, 202)
  const limited = await handleContact(request(), deps)
  assert.equal(limited.status, 429); assert.ok(Number(limited.headers.get('Retry-After')) > 0)
  const db = payload.db.drizzle.$client; db.close()
  const unavailable = await handleContact(request({ ...input, email: 'new@example.test' }), deps)
  assert.equal(unavailable.status, 503)
  assert.equal(JSON.stringify(await unavailable.json()).includes('PRIVATE'), false)
}))

test('SMTP acceptance followed by failed finalization keeps 202 and retries expired lease with stable Message-ID', () => withTestPayload(async payload => {
  const { notifyEnquiry } = await import('../../src/cms/contact-notifications.ts')
  const key = randomUUID(), messages: string[] = [], date = new Date('2026-10-21T10:00:00Z')
  const config = payload.collections.enquiries.config, original = config.hooks.beforeChange
  const transport = { async send(mail: { messageId: string }) {
    messages.push(mail.messageId)
    config.hooks.beforeChange = [({ data }) => { if (data.notificationStatus === 'sent') throw new Error('Controlled completion persistence failure'); return data }]
  } }
  let response: Response
  try { response = await handleContact(request(input, key), { payload, allowedOrigins: new Set([origin]), transport, now: () => date }) }
  finally { config.hooks.beforeChange = original }
  assert.equal(response!.status, 202)
  let record = (await payload.find({ collection: 'enquiries' })).docs[0]
  assert.equal(record.notificationStatus, 'sending'); assert.ok(record.notificationLeaseUntil)
  assert.equal((await handleContact(request(input, key), { payload, allowedOrigins: new Set([origin]), transport: null })).status, 202)
  assert.equal(messages.length, 1)
  assert.equal(await notifyEnquiry(payload, record.id, { async send(mail) { messages.push(mail.messageId) } }, () => new Date(date.getTime() + 300001)), 'sent')
  assert.equal(messages.length, 2); assert.equal(messages[0], messages[1])
  record = await payload.findByID({ collection: 'enquiries', id: record.id }); assert.equal(record.notificationAttempts, 2); assert.equal(record.notificationStatus, 'sent')
}))
