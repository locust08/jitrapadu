import test from 'node:test'
import assert from 'node:assert/strict'
import { withTestPayload, body } from './fixtures.ts'


const editor = { id: 999, collection: 'users' as const, role: 'editor' as const }

test('drafts require authentication and provenance and versions remain private', () => withTestPayload(async payload => {
  const post = await payload.create({ collection: 'posts', draft: true, data: { title: 'Review', slug: 'review', category: 'news', body: body(), reviewNotes: 'PRIVATE' } })
  assert.equal((await payload.find({ collection: 'posts', draft: true, overrideAccess: false })).totalDocs, 0)
  assert.equal((await payload.find({ collection: 'posts', draft: true, overrideAccess: false, user: editor })).totalDocs, 1)
  await assert.rejects(payload.findVersions({ collection: 'posts', overrideAccess: false }))
  await payload.update({ collection: 'posts', id: post.id, data: { _status: 'published' } })
  const visible = await payload.findByID({ collection: 'posts', id: post.id, overrideAccess: false })
  assert.equal('reviewNotes' in visible, false)
}))

test('editors publish but cannot delete; invalid category, slug duplicate and missing body are rejected', () => withTestPayload(async payload => {
  const post = await payload.create({ collection: 'posts', overrideAccess: false, user: editor, data: { title: 'Public', slug: 'public', category: 'news', body: body(), _status: 'published' } })
  await assert.rejects(payload.delete({ collection: 'posts', id: post.id, overrideAccess: false, user: editor }))
  await assert.rejects(payload.create({ collection: 'posts', data: { title: 'Duplicate', slug: 'public', category: 'news', body: body(), _status: 'published' } }))
  await assert.rejects(payload.create({ collection: 'posts', data: { title: 'Invalid', slug: 'invalid', category: 'bad' as 'news', body: body(), _status: 'published' } }))
  await assert.rejects(payload.create({ collection: 'posts', data: { title: 'Empty', slug: 'empty', category: 'news', body: undefined as unknown as ReturnType<typeof body>, _status: 'published' } }))
}))

test('events require start and location only when publishing', () => withTestPayload(async payload => {
  const post = await payload.create({ collection: 'posts', draft: true, data: { title: 'Proposed', slug: 'proposed', category: 'event', body: body() } })
  await assert.rejects(payload.update({ collection: 'posts', id: post.id, data: { _status: 'published' } }))
  await assert.rejects(payload.update({ collection: 'posts', id: post.id, data: { _status: 'published', eventStart: '2026-11-01T10:00:00Z', eventLocation: '   ' } }))
  await assert.rejects(payload.update({ collection: 'posts', id: post.id, data: { _status: 'published', eventStart: 'invalid', eventLocation: 'Klang' } }))
  await payload.update({ collection: 'posts', id: post.id, data: { _status: 'published', eventStart: '2026-11-01T10:00:00Z', eventLocation: 'Klang' } })
  const other = await payload.create({ collection: 'posts', draft: true, data: { title: 'Reclassified', slug: 'reclassified', category: 'event', body: body() } })
  await payload.update({ collection: 'posts', id: other.id, data: { category: 'news', body: undefined as unknown as ReturnType<typeof body>, _status: 'published' } })
}))

test('first publication date persists and published version survives later draft', () => withTestPayload(async payload => {
  const post = await payload.create({ collection: 'posts', data: { title: 'Version', slug: 'version', category: 'csr', body: body('PUBLIC'), _status: 'published' } })
  assert.ok(post.publicationDate)
  await payload.update({ collection: 'posts', id: post.id, draft: true, data: { title: 'Private revision', body: body('PRIVATE'), _status: 'draft' } })
  const visible = await payload.findByID({ collection: 'posts', id: post.id, draft: false, overrideAccess: false })
  assert.equal(visible.title, 'Version')
  assert.equal(visible.publicationDate, post.publicationDate)
  assert.equal(JSON.stringify(visible).includes('PRIVATE'), false)
}))
