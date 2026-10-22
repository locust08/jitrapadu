import test from 'node:test'
import assert from 'node:assert/strict'
import { withTestPayload } from './fixtures.ts'
import { seedPosts } from '../../scripts/cms/seed-posts.ts'

test('six starter drafts rerun without overwriting edited or published content', () => withTestPayload(async payload => {
  assert.deepEqual(await seedPosts(payload), { created: 6, skipped: 0, failed: 0, failures: [] })
  const entries = await payload.find({ collection: 'posts', draft: true, limit: 10 })
  assert.equal(entries.totalDocs, 6)
  for (const category of ['news', 'event', 'csr']) assert.equal(entries.docs.filter(p => p.category === category).length, 2)
  for (const p of entries.docs) {
    assert.equal(p._status, 'draft')
    assert.equal(p.banner, null)
    assert.ok(p.reviewNotes)
    if (p.category === 'event') { assert.equal(p.eventStart, null); assert.equal(p.eventLocation, null) }
    if (p.category !== 'news') assert.match(JSON.stringify(p.body), /propos/i)
  }
  const news = entries.docs.find(p => p.category === 'news')!
  await payload.update({ collection: 'posts', id: news.id, data: { title: 'Client reviewed edit', _status: 'published' } })
  assert.deepEqual(await seedPosts(payload), { created: 0, skipped: 6, failed: 0, failures: [] })
  assert.equal((await payload.findByID({ collection: 'posts', id: news.id })).title, 'Client reviewed edit')
}))
