import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { storeContact, withContactTransaction } from '../../src/cms/contact-store.ts'
import { ContactError, type ContactInput } from '../../src/cms/contact-validation.ts'
import { withTestPayload, withSecondPayload } from './fixtures.ts'
const input: ContactInput = { fullName: 'Private Test', email: 'private@example.test', message: 'Discuss the project requirements.', consent: true }
const now = () => new Date('2026-10-21T10:00:00Z')
const errorStatus = (n: number) => (e: unknown) => e instanceof ContactError && e.status === n

test('durable contact deduplication conflicts, rolling email quota and rollback', () => withTestPayload(async payload => {
  const key = randomUUID(), first = await storeContact(payload, key, input, now)
  assert.equal(first.kind, 'created')
  assert.deepEqual(await storeContact(payload, key, input, now), { kind: 'replay', enquiryId: first.enquiryId })
  await assert.rejects(storeContact(payload, key, { ...input, message: 'Different project details' }, now), errorStatus(409))
  for (let i = 0; i < 4; i++) await storeContact(payload, randomUUID(), input, now)
  await assert.rejects(storeContact(payload, randomUUID(), input, now), (e: unknown) => e instanceof ContactError && e.status === 429 && e.retryAfter === 900)
  await storeContact(payload, randomUUID(), input, () => new Date(now().getTime() + 900000))
  await assert.rejects(withContactTransaction(payload, async req => {
    await payload.create({ collection: 'contact-rate-events', req, data: { emailHash: 'rollback', acceptedAt: now().toISOString(), expiresAt: now().toISOString() } })
    throw new Error('controlled rollback')
  }))
  assert.equal((await payload.count({ collection: 'contact-rate-events', where: { emailHash: { equals: 'rollback' } } })).totalDocs, 0)
  const saved = await payload.findByID({ collection: 'enquiries', id: first.enquiryId })
  assert.equal(saved.consentVersion, 'enquiry-contact-v1')
  assert.equal(saved.consentText, 'I agree to be contacted by Jitrapadu Engineering regarding my enquiry.')
  assert.equal(JSON.stringify(await payload.find({ collection: 'contact-rate-events' })).includes(input.email), false)
  await storeContact(payload, randomUUID(), input, () => new Date(now().getTime() + 3600000))
  assert.equal((await payload.count({ collection: 'contact-rate-events' })).totalDocs, 2)
}))

test('separate connections serialize same-key and quota races', () => withTestPayload(async (payload, paths) => withSecondPayload(payload, paths, async other => {
  const key = randomUUID()
  const same = await Promise.all([storeContact(payload, key, input, now), storeContact(other, key, input, now)])
  assert.deepEqual(same.map(r => r.kind).sort(), ['created', 'replay'])
  assert.equal((await payload.count({ collection: 'enquiries' })).totalDocs, 1)
  const race = await Promise.allSettled(Array.from({ length: 6 }, (_, i) => storeContact(i % 2 ? other : payload, randomUUID(), { ...input, email: 'race@example.test' }, now)))
  assert.equal(race.filter(r => r.status === 'fulfilled').length, 5)
  for (const r of race) if (r.status === 'rejected') assert.equal(r.reason.status, 429)
  const conflicting = randomUUID()
  const conflict = await Promise.allSettled([storeContact(payload, conflicting, { ...input, email: 'conflict@example.test' }, now), storeContact(other, conflicting, { ...input, email: 'conflict@example.test', message: 'Other normalized payload' }, now)])
  assert.equal(conflict.filter(r => r.status === 'fulfilled').length, 1)
  assert.equal((conflict.find(r => r.status === 'rejected') as PromiseRejectedResult).reason.status, 409)
})))

test('global last allowance is atomic across connections and recovers at one hour', () => withTestPayload(async (payload, paths) => {
  for (let i = 0; i < 99; i++) await payload.create({ collection: 'contact-rate-events', data: { emailHash: `seed-${i}`, acceptedAt: now().toISOString(), expiresAt: new Date(now().getTime() + 3600000).toISOString() } })
  await withSecondPayload(payload, paths, async other => {
    const race = await Promise.allSettled([storeContact(payload, randomUUID(), input, now), storeContact(other, randomUUID(), { ...input, email: 'other@example.test' }, now)])
    assert.equal(race.filter(r => r.status === 'fulfilled').length, 1)
    const rejected = race.find(r => r.status === 'rejected') as PromiseRejectedResult
    assert.equal(rejected.reason.status, 429); assert.equal(rejected.reason.retryAfter, 3600)
  })
  await storeContact(payload, randomUUID(), { ...input, email: 'new@example.test' }, () => new Date(now().getTime() + 3600000))
  assert.equal((await payload.count({ collection: 'contact-rate-events' })).totalDocs, 1)
}))

test('contact persistence failure rolls back enquiry and quota and permits same-key retry', () => withTestPayload(async payload => {
  const key = randomUUID(), config = payload.collections['contact-rate-events'].config
  const before = config.hooks.beforeChange
  config.hooks.beforeChange = [() => { throw new Error('Controlled quota persistence failure') }]
  try { await assert.rejects(storeContact(payload, key, input), errorStatus(503)) }
  finally { config.hooks.beforeChange = before }
  assert.equal((await payload.count({ collection: 'enquiries' })).totalDocs, 0)
  assert.equal((await payload.count({ collection: 'contact-rate-events' })).totalDocs, 0)
  assert.equal((await storeContact(payload, key, input)).kind, 'created')
  assert.equal((await payload.count({ collection: 'enquiries' })).totalDocs, 1)
  assert.equal((await payload.count({ collection: 'contact-rate-events' })).totalDocs, 1)
}))

test('driver failure before commit rolls back both records and returns storage failure', () => withTestPayload(async payload => {
  const key = randomUUID(), original = payload.db.drizzle.transaction
  const transact = original.bind(payload.db.drizzle)
  payload.db.drizzle.transaction = (run, config) => transact(async tx => { await run(tx); throw new Error('Controlled commit failure') }, config)
  try { await assert.rejects(storeContact(payload, key, input), errorStatus(503)) }
  finally { payload.db.drizzle.transaction = original }
  assert.equal((await payload.count({ collection: 'enquiries' })).totalDocs, 0)
  assert.equal((await payload.count({ collection: 'contact-rate-events' })).totalDocs, 0)
  assert.equal((await storeContact(payload, key, input)).kind, 'created')
}))
