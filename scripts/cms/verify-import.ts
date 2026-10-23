import assert from 'node:assert/strict'
import { getPayload } from 'payload'
import config from '../../src/payload.config'
import { randomBytes } from 'node:crypto'

const payload = await getPayload({ config })
const expected = { 'source-pages': 5, solutions: 5, faqs: 4, partners: 19 } as const
let testUserId: number | undefined

try {
  // Recover only reserved verification identities if an earlier verification was interrupted.
  const stale = await payload.find({ collection: 'users', overrideAccess: true, limit: 100, where: { email: { like: 'cms-verification-' } } })
  for (const user of stale.docs) {
    if (/^cms-verification-[a-f0-9]{16}@example\.invalid$/.test(user.email)) await payload.delete({ collection: 'users', id: user.id, overrideAccess: true })
  }
  for (const [collection, minimum] of Object.entries(expected)) {
    const slug = collection as keyof typeof expected
    const trusted = await payload.find({ collection: slug, draft: true, limit: 1000, overrideAccess: true, depth: 0, where: { importKey: { like: 'original:' } } })
    assert.equal(trusted.totalDocs, minimum, `${slug}: imported draft count`)
    assert.ok(trusted.docs.every(doc => doc._status === 'draft'), `${slug}: imports must remain drafts`)
    if (slug === 'source-pages') await assert.rejects(payload.find({ collection: slug, overrideAccess: false }))
    else {
      const publicRead = await payload.find({ collection: slug, draft: true, limit: 1000, overrideAccess: false, depth: 0 })
      assert.equal(publicRead.totalDocs, 0, `${slug}: drafts must be private, even with draft=true`)
    }
    await assert.rejects(payload.findVersions({ collection: slug, overrideAccess: false, limit: 1 }), `${slug}: version history must be private`)
  }
  const media = await payload.find({ collection: 'media', limit: 200, depth: 0, overrideAccess: true })
  assert.equal(media.totalDocs, 105)
  assert.ok(media.docs.every(doc => doc.reviewStatus === 'pending'))
  assert.equal((await payload.find({ collection: 'media', overrideAccess: false, limit: 1 })).totalDocs, 0)
  await assert.rejects(payload.findGlobal({ slug: 'site-settings', overrideAccess: false }))
  assert.equal((await payload.findGlobal({ slug: 'site-settings', draft: true, overrideAccess: true }))._status, 'draft')
  await assert.rejects(payload.create({ collection: 'faqs', overrideAccess: false, data: { question: 'Unauthorized', answer: 'Denied' } }))
  await assert.rejects(payload.create({ collection: 'users', overrideAccess: false, data: { email: 'unauthorized@example.invalid', password: randomBytes(32).toString('hex'), role: 'admin' } }))

  // An ephemeral, random local account proves authenticated review without leaving credentials behind.
  const beforeUsers = await payload.count({ collection: 'users', overrideAccess: true })
  const user = await payload.create({ collection: 'users', overrideAccess: true, data: { email: `cms-verification-${randomBytes(8).toString('hex')}@example.invalid`, password: randomBytes(48).toString('hex'), role: 'editor' } })
  testUserId = user.id
  assert.equal(user.role, beforeUsers.totalDocs === 0 ? 'admin' : 'editor', 'first account becomes admin; later accounts retain the assigned role')
  const reviewer = { ...user, role: 'editor' as const, collection: 'users' as const }
  assert.equal((await payload.find({ collection: 'faqs', draft: true, user: reviewer, overrideAccess: false, limit: 100 })).totalDocs, 4)
  assert.equal((await payload.find({ collection: 'media', user: reviewer, overrideAccess: false, limit: 1 })).totalDocs, 105)
  await assert.rejects(payload.update({ collection: 'users', id: user.id, user: reviewer, overrideAccess: false, data: { role: 'admin' } }))
  console.log(JSON.stringify({ verified: true, drafts: expected, pendingMedia: media.totalDocs, anonymousDrafts: 0, anonymousMedia: 0, anonymousWrites: 'denied', editorReview: 'allowed', editorUserAdministration: 'denied' }, null, 2))
} finally {
  if (testUserId !== undefined) await payload.delete({ collection: 'users', id: testUserId, overrideAccess: true })
  const client = payload.db.drizzle.$client
  await payload.destroy()
  client.close()
}
