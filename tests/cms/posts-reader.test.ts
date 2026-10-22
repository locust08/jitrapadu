import test from 'node:test'
import assert from 'node:assert/strict'
import { body, withTestPayload } from './fixtures.ts'
import { parsePostQuery, listPublishedPosts, getPublishedPost } from '../../src/cms/posts-reader.ts'

test('editorial query validates categories and bounded pagination', () => {
  assert.deepEqual(parsePostQuery(new URLSearchParams()), { categories: ['news', 'event', 'csr'], page: 1, limit: 12 })
  assert.deepEqual(parsePostQuery(new URLSearchParams('category=news,event&limit=50&page=2')), { categories: ['news', 'event'], page: 2, limit: 50 })
  for (const value of ['page=0', 'page=1.2', 'page=NaN', 'limit=0', 'limit=51', 'category=', 'category=other', 'category=news,news', 'page=1&page=2']) assert.throws(() => parsePostQuery(new URLSearchParams(value)))
  assert.equal(parsePostQuery(new URLSearchParams('draft=true')).limit, 12)
})

test('published reader excludes drafts, private notes and unapproved banners and preserves the published body', () => withTestPayload(async payload => {
  const draft = await payload.create({ collection: 'posts', draft: true, data: { title: 'Draft', slug: 'draft', category: 'news', body: body() } })
  assert.equal(await getPublishedPost(payload, draft.slug), null)
  const media = await payload.create({ collection: 'media', data: { label: 'Pending', reviewStatus: 'pending' }, file: { data: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>'), name: 'image.svg', mimetype: 'image/svg+xml', size: 80 } })
  const post = await payload.create({ collection: 'posts', data: { title: 'Public', slug: 'public', category: 'news', body: body('PUBLIC_BODY'), banner: media.id, reviewNotes: 'PRIVATE_SENTINEL', _status: 'published' } })
  await payload.update({ collection: 'posts', id: post.id, draft: true, data: { body: body('SECRET_DRAFT'), _status: 'draft' } })
  const visible = await getPublishedPost(payload, 'public')
  assert.equal(visible?.banner, null)
  assert.ok(JSON.stringify(visible?.body).includes('PUBLIC_BODY'))
  assert.equal(JSON.stringify(visible).includes('PRIVATE_SENTINEL'), false)
  assert.equal(JSON.stringify(visible).includes('SECRET_DRAFT'), false)
  const page = await listPublishedPosts(payload, parsePostQuery(new URLSearchParams()))
  assert.equal(page.totalDocs, 1)
  assert.equal('body' in page.docs[0], false)
}))

test('combined categories paginate in stable order and related posts prefer manual entries then fill', () => withTestPayload(async payload => {
  const make = async (slug: string, category: 'news' | 'event' | 'csr', published = true) => payload.create({ collection: 'posts', draft: !published, data: { title: slug, slug, category, body: body(), publicationDate: '2026-10-21T00:00:00Z', ...(category === 'event' ? { eventStart: '2026-11-01T00:00:00Z', eventLocation: 'Klang' } : {}), _status: published ? 'published' : 'draft' } })
  const a = await make('a', 'news'), b = await make('b', 'event'), c = await make('c', 'csr'), d = await make('d', 'news'), e = await make('e', 'news'), hidden = await make('hidden', 'news', false)
  await payload.update({ collection: 'posts', id: a.id, data: { relatedPosts: [c.id, hidden.id, a.id, c.id] } })
  const page = await listPublishedPosts(payload, parsePostQuery(new URLSearchParams('category=news,event&limit=2')))
  assert.deepEqual(page.docs.map(p => p.slug), ['e', 'd'])
  assert.equal(page.totalDocs, 4)
  assert.equal(page.totalPages, 2)
  assert.equal(page.hasNextPage, true)
  const second = await listPublishedPosts(payload, parsePostQuery(new URLSearchParams('category=news,event&limit=2&page=2')))
  assert.deepEqual(second.docs.map(p => p.slug), [b.slug, a.slug])
  const detail = await getPublishedPost(payload, 'a')
  assert.deepEqual(detail?.related.map(p => p.slug), ['c', e.slug, d.slug])
  assert.equal(detail?.related.some(p => 'body' in p), false)
  assert.equal((await listPublishedPosts(payload, { categories: ['csr'], page: 99, limit: 12 })).docs.length, 0)
}))
