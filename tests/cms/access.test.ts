import assert from 'node:assert/strict'
import test from 'node:test'

test('anonymous readers are limited to published content and approved media', async () => {
  const { publishedOrAuthenticated, approvedMediaOrAuthenticated } = await import('../../src/cms/access.ts')
  const req = { user: null }
  assert.deepEqual(publishedOrAuthenticated({ req }), { _status: { equals: 'published' } })
  assert.deepEqual(approvedMediaOrAuthenticated({ req }), { reviewStatus: { equals: 'approved' } })
})

test('reviewers can read drafts but cannot administer users', async () => {
  const { publishedOrAuthenticated, approvedMediaOrAuthenticated, isAdmin, authenticated } = await import('../../src/cms/access.ts')
  const req = { user: { id: 1, role: 'editor', collection: 'users' } }
  assert.equal(publishedOrAuthenticated({ req }), true)
  assert.equal(approvedMediaOrAuthenticated({ req }), true)
  assert.equal(authenticated({ req }), true)
  assert.equal(isAdmin({ req }), false)
  assert.equal(isAdmin({ req: { user: { role: 'admin', collection: 'users' } } }), true)
  assert.equal(authenticated({ req: { user: null } }), false)
})
