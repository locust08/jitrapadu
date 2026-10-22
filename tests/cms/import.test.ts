import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

test('rerunning a draft import skips existing records and preserves editor changes', async () => {
  const { importDraftRecord } = await import('../../scripts/cms/import-data.ts')
  const records = new Map<string, Record<string, unknown>>()
  const store = {
    async findExisting(collection: string, key: string) { return records.get(collection + key) },
    async createDraft(collection: string, data: Record<string, unknown>) { records.set(collection + data.importKey, data); return data },
  }
  assert.equal((await importDraftRecord(store, 'faqs', { importKey: 'source:1', answer: 'Source' })).status, 'created')
  const record = records.get('faqssource:1')!
  assert.equal(record._status, 'draft')
  record.answer = 'Human edit'
  assert.equal((await importDraftRecord(store, 'faqs', { importKey: 'source:1', answer: 'Source' })).status, 'skipped')
  assert.equal(records.size, 1)
  assert.equal(records.get('faqssource:1')?.answer, 'Human edit')
})

test('asset verification rejects missing, corrupt and out-of-directory files', async () => {
  const { verifyAsset } = await import('../../scripts/cms/import-data.ts')
  const root = await mkdtemp(path.join(tmpdir(), 'jitrapadu-import-'))
  await writeFile(path.join(root, 'asset.png'), 'corrupted')
  await assert.rejects(verifyAsset(root, { localPath: 'missing.png', sha256: 'expected' }))
  await assert.rejects(verifyAsset(root, { localPath: 'asset.png', sha256: 'expected' }), /checksum/)
  await assert.rejects(verifyAsset(root, { localPath: '../secret', sha256: 'expected' }), /outside/)
})

test('import cannot accept a missing stable key or publish source content', async () => {
  const { importDraftRecord } = await import('../../scripts/cms/import-data.ts')
  const writes: Record<string, unknown>[] = []
  const store = { async findExisting() { return undefined }, async createDraft(_collection: string, data: Record<string, unknown>) { writes.push(data); return data } }
  await assert.rejects(importDraftRecord(store, 'faqs', { title: 'Missing key' }), /importKey/)
  await importDraftRecord(store, 'faqs', { importKey: 'source:2', _status: 'published' })
  assert.equal(writes[0]._status, 'draft')
})

test('source pages wait for all expected media so retry does not freeze incomplete relationships', async () => {
  const { resolvePageMedia } = await import('../../scripts/cms/import-data.ts')
  const assets = [{ sourceUrl: 'asset:a', sourcePages: ['page:1'] }, { sourceUrl: 'asset:b', sourcePages: ['page:1'] }]
  assert.throws(() => resolvePageMedia('page:1', assets, new Map([['asset:a', 1]])), /Missing imported media/)
  assert.deepEqual(resolvePageMedia('page:1', assets, new Map([['asset:a', 1], ['asset:b', 2]])), [1, 2])
})
