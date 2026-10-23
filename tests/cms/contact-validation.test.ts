import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { parseContactRequest, contactOrigins, ContactError } from '../../src/cms/contact-validation.ts'
const origin = 'http://localhost:3001'
const allowed = new Set([origin])
export const validContact = { fullName: 'Test Person', email: 'person@example.test', message: 'Please discuss our project.', consent: true }
const request = (input: unknown, headers: Record<string, string> = {}) => new Request(origin + '/api/contact', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID(), ...headers }, body: JSON.stringify(input) })
const status = (n: number) => (e: unknown) => e instanceof ContactError && e.status === n

test('contact validates and normalizes without accepting server-owned fields', async () => {
  const result = await parseContactRequest(request({ ...validContact, fullName: '  Test Person ', email: ' PERSON@EXAMPLE.TEST ', company: '  ', quantity: 1 }), allowed)
  assert.equal(result.input.fullName, 'Test Person'); assert.equal(result.input.email, 'person@example.test'); assert.equal(result.input.company, undefined)
  for (const changes of [{ consent: false }, { fullName: 'x' }, { fullName: 'x'.repeat(121) }, { message: 'short' }, { message: 'x'.repeat(5001) }, { email: 'bad' }, { email: 'x'.repeat(250) + '@a.test' }, { company: 'x'.repeat(201) }, { phone: 'x'.repeat(41) }, { timeline: 'x'.repeat(121) }, { quantity: 0 }, { quantity: 1.5 }, { quantity: 1000001 }, { projectStage: 'Upgrade' }, { solutionInterest: 'bad' }, { from: 'attacker@example.test' }, { notificationStatus: 'sent' }, { email: 'a@example.test\r\nBcc: x@y.test' }, { fullName: 'a\u0000b' }, { phone: '12\n34' }]) {
    await assert.rejects(parseContactRequest(request({ ...validContact, ...changes }), allowed), status(422))
  }
  for (const projectStage of ['Planning', 'Tender', 'Design', 'Fabrication', 'Deployment', 'Maintenance / Upgrade']) await parseContactRequest(request({ ...validContact, projectStage }), allowed)
  assert.equal((await parseContactRequest(request({ ...validContact, website: 'spam' }), allowed)).honeypot, true)
})

test('contact request checks origin, type, key, JSON and bounded streamed bytes', async () => {
  await assert.rejects(parseContactRequest(request(validContact, { Origin: '' }), allowed), status(403))
  await assert.rejects(parseContactRequest(request(validContact, { Origin: 'https://evil.test', 'X-Forwarded-Host': 'localhost:3001' }), allowed), status(403))
  await assert.rejects(parseContactRequest(request(validContact, { 'Content-Type': 'text/plain' }), allowed), status(415))
  await assert.rejects(parseContactRequest(request(validContact, { 'Idempotency-Key': 'bad' }), allowed), status(400))
  const malformed = request(validContact); await assert.rejects(parseContactRequest(new Request(malformed, { body: '{' }), allowed), status(400))
  await assert.rejects(parseContactRequest(request([]), allowed), status(422))
  const base = JSON.stringify(validContact)
  const exact = request(validContact); assert.ok(await parseContactRequest(new Request(exact, { body: base + ' '.repeat(16384 - Buffer.byteLength(base)) }), allowed))
  let cancelled = false
  const stream = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode('你'.repeat(5500))) }, cancel() { cancelled = true } })
  const streamed = new Request(request(validContact, { 'Content-Length': '1' }), { body: stream, duplex: 'half' } as RequestInit)
  await assert.rejects(parseContactRequest(streamed, allowed), status(413)); assert.equal(cancelled, true)
  assert.deepEqual([...contactOrigins({ NEXT_PUBLIC_SERVER_URL: origin })], [origin])
  assert.deepEqual([...contactOrigins({ CONTACT_ALLOWED_ORIGINS: 'https://www.jitrapadu.com,https://jitrapadu.com' })], ['https://www.jitrapadu.com', 'https://jitrapadu.com'])
  assert.throws(() => contactOrigins({ CONTACT_ALLOWED_ORIGINS: 'https://evil.test/path' }))
})
