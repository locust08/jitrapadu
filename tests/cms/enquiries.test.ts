import test from 'node:test'
import assert from 'node:assert/strict'
import { withTestPayload } from './fixtures.ts'

test('enquiries and rate events remain admin-only and service-created', () => withTestPayload(async payload => {
  const data = { status: 'new' as const, notificationStatus: 'pending' as const, fullName: 'Private Person', email: 'private@example.test', message: 'Private project', consent: true, consentVersion: 'enquiry-contact-v1', consentText: 'Agreed', receivedAt: new Date().toISOString(), idempotencyHash: 'key', payloadFingerprint: 'hash' }
  const enquiry = await payload.create({ collection: 'enquiries', data })
  const admin = { id: 999, collection: 'users' as const, role: 'admin' as const }, editor = { ...admin, role: 'editor' as const }
  for (const user of [null, editor]) {
    await assert.rejects(payload.find({ collection: 'enquiries', overrideAccess: false, user }))
    await assert.rejects(payload.findByID({ collection: 'enquiries', id: enquiry.id, overrideAccess: false, user }))
    await assert.rejects(payload.update({ collection: 'enquiries', id: enquiry.id, data: { status: 'closed' }, overrideAccess: false, user }))
    await assert.rejects(payload.delete({ collection: 'enquiries', id: enquiry.id, overrideAccess: false, user }))
    await assert.rejects(payload.find({ collection: 'contact-rate-events', overrideAccess: false, user }))
  }
  for (const user of [null, editor, admin]) await assert.rejects(payload.create({ collection: 'enquiries', data, overrideAccess: false, user }))
  assert.equal((await payload.find({ collection: 'enquiries', overrideAccess: false, user: admin })).totalDocs, 1)
  const updated = await payload.update({ collection: 'enquiries', id: enquiry.id, data: { status: 'replied', notificationStatus: 'sent' }, overrideAccess: false, user: admin })
  assert.equal(updated.status, 'replied'); assert.equal(updated.notificationStatus, 'pending')
  await payload.delete({ collection: 'enquiries', id: enquiry.id, overrideAccess: false, user: admin })
}))
