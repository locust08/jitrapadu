import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { withTestPayload } from './fixtures.ts'
import { verifySchemaUpgrade } from '../../scripts/cms/verify-schema-upgrade.ts'

test('copy-first schema verification preserves data and does not mutate source on failure', () => withTestPayload(async (payload, paths) => {
  await payload.create({ collection: 'solutions', data: { title: 'Retain me', slug: 'legacy', body: 'Existing draft', _status: 'draft' } })
  await payload.db.drizzle.$client.execute('PRAGMA wal_checkpoint(TRUNCATE)')
  const digest = async () => createHash('sha256').update(await readFile(paths.database)).digest('hex')
  const before = await digest()
  const result = await verifySchemaUpgrade(paths.database)
  assert.equal(result.rowsPreserved, true); assert.equal(result.foreignKeyViolations, 0); assert.equal(result.remainingStatements, 0)
  assert.equal(await digest(), before)
  await payload.db.drizzle.$client.execute('CREATE TABLE unexpected_source_data (id INTEGER PRIMARY KEY, value TEXT)')
  await payload.db.drizzle.$client.execute("INSERT INTO unexpected_source_data (value) VALUES ('preserve')")
  await payload.db.drizzle.$client.execute('PRAGMA wal_checkpoint(TRUNCATE)')
  const withUnexpected = await digest()
  await assert.rejects(verifySchemaUpgrade(paths.database))
  assert.equal(await digest(), withUnexpected)
}, {legacy:true}))

test('synchronized schema with an orphaned relationship fails verification', () => withTestPayload(async (payload, paths) => {
  const client = payload.db.drizzle.$client
  await client.execute('PRAGMA foreign_keys=OFF')
  await client.execute("INSERT INTO payload_locked_documents_rels (id,parent_id,path) VALUES (999,999,'orphan')")
  await client.execute('PRAGMA foreign_keys=ON')
  assert.equal((await client.execute('PRAGMA foreign_key_check')).rows.length, 1)
  await assert.rejects(verifySchemaUpgrade(paths.database), /Foreign key violations/)
}))
