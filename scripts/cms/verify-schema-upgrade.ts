import assert from 'node:assert/strict'
import { createHash, randomUUID } from 'node:crypto'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, mkdtemp, stat, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig, getPayload } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import * as collections from '../../src/cms/collections'
import { SiteSettings } from '../../src/cms/site-settings'
import { disabledEmailAdapter } from '../../src/cms/contact-email'
const execute = promisify(execFile)
const quote = (v: string) => '"' + v.replaceAll('"', '""') + '"'

export async function verifySchemaUpgrade(source: string, options: { apply?: boolean } = {}) {
  source = path.resolve(source); assert.ok((await stat(source)).isFile(), 'Database source must exist')
  const parent = path.resolve('temp/cms/backups'); await mkdir(parent, { recursive: true })
  const backupRoot = await mkdtemp(path.join(parent, 'editorial-contact-'))
  const backup = path.join(backupRoot, 'before.db'), copy = path.join(backupRoot, 'verification.db')
  const backupCode = 'import sqlite3,sys\nsrc=sqlite3.connect("file:"+sys.argv[1]+"?mode=ro",uri=True)\ndst=sqlite3.connect(sys.argv[2])\nsrc.backup(dst)\ndst.close()\nsrc.close()'
  await execute('python3', ['-c', backupCode, source, backup])
  await execute('python3', ['-c', backupCode, backup, copy])
  const uploads = path.resolve(process.env.PAYLOAD_UPLOAD_DIR || 'temp/cms/uploads')
  const inventory = await readdir(uploads).catch(() => [] as string[])
  await writeFile(path.join(backupRoot, 'upload-inventory.json'), JSON.stringify(inventory.sort()))
  async function upgrade(database: string) {
    const config = buildConfig({ secret: randomUUID(), editor: lexicalEditor(), sharp, email: disabledEmailAdapter,
      db: sqliteAdapter({ client: { url: `file:${database}` }, push: false, wal: true, transactionOptions: { behavior: 'immediate' } }),
      collections: Object.values(collections).filter((v): v is typeof collections.Users => !!v && typeof v === 'object' && 'slug' in v),
      globals: [SiteSettings], typescript: { autoGenerate: false }, telemetry: false,
    })
    const payload = await getPayload({ config, key: randomUUID() }), client = payload.db.drizzle.$client
    try {
      const tables = (await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")).rows.map(r => String(r.name))
      if (tables.some(table => !(table in payload.db.rawTables))) throw new Error('Unexpected source table; manual schema review required')
      const columns = new Map<string, string[]>(), hashes = new Map<string, string>()
      async function digest(table: string, names: string[]) {
        const rows = (await client.execute(`SELECT ${names.map(quote).join(',')} FROM ${quote(table)}`)).rows
        const canonical = rows.map(r => JSON.stringify(names.map(n => typeof r[n] === 'bigint' ? String(r[n]) : r[n]))).sort()
        return createHash('sha256').update(JSON.stringify(canonical)).digest('hex')
      }
      for (const table of tables) {
        const names = (await client.execute(`PRAGMA table_info(${quote(table)})`)).rows.map(r => String(r.name))
        columns.set(table, names); hashes.set(table, await digest(table, names))
      }
      // Adapter's bundled kit typings omit SQLite statement plans; narrow the runtime API explicitly.
      const kit = payload.db.requireDrizzleKit() as unknown as { pushSchema: (schema: unknown, db: unknown) => Promise<{ hasDataLoss: boolean; warnings: string[]; statementsToExecute: string[] }> }
      let appliedStatements = 0
      let plan = await kit.pushSchema(payload.db.schema, payload.db.drizzle)
      for (let pass = 1; pass <= 2 && plan.statementsToExecute.length; pass++) {
        if (plan.hasDataLoss || plan.warnings.length) throw new Error('Unsafe schema change; source left untouched')
        if (pass === 2 && plan.statementsToExecute.some(s => /^DROP TABLE /i.test(s) && !/^DROP TABLE `payload_locked_documents_rels`;/i.test(s))) throw new Error('Unexpected second-pass rebuild')
        // Earlier SQLite sync generated duplicate index creates and deferred added relationship FKs.
        const statements = [...new Set(plan.statementsToExecute.filter(s => !/^PRAGMA /i.test(s)).map(s => s.replace(/^(CREATE(?: UNIQUE)? INDEX) /i, '$1 IF NOT EXISTS ')))]
        await writeFile(path.join(backupRoot, `${database === copy ? 'copy' : 'apply'}-statements-${pass}.json`), JSON.stringify(statements, null, 2))
        await client.execute('PRAGMA foreign_keys=OFF')
        try { if (statements.length) await client.batch(statements, 'write') } finally { await client.execute('PRAGMA foreign_keys=ON') }
        appliedStatements += statements.length
        for (const table of tables) assert.equal(await digest(table, columns.get(table)!), hashes.get(table), 'Existing record contents changed')
        const foreignKeys = await client.execute('PRAGMA foreign_key_check'); assert.equal(foreignKeys.rows.length, 0, 'Foreign key violations')
        plan = await kit.pushSchema(payload.db.schema, payload.db.drizzle)
      }
      await writeFile(path.join(backupRoot, 'remaining-statements.json'), JSON.stringify(plan.statementsToExecute, null, 2))
      assert.equal(plan.statementsToExecute.length, 0, 'Schema changes remain after upgrade')
      assert.equal((await client.execute('PRAGMA foreign_key_check')).rows.length, 0, 'Foreign key violations')
      return { rowsPreserved: true, foreignKeyViolations: 0, remainingStatements: 0, appliedStatements }
    } finally { await payload.destroy(); client.close() }
  }
  const verification = await upgrade(copy)
  // The copy is proved before an explicitly requested apply. Operators must stop other writers.
  const result = options.apply ? await upgrade(source) : verification
  return { ...result, applied: !!options.apply, backupRoot }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), source = args.find(a => a.startsWith('--source='))?.slice(9)
    if (!source || args.some(a => a !== '--apply' && !a.startsWith('--source='))) throw new Error('Usage: --source=path [--apply]')
    console.log(JSON.stringify(await verifySchemaUpgrade(source, { apply: args.includes('--apply') }), null, 2))
  } catch { console.error('Schema verification failed; no reset performed. Inspect the private backup and schema plan.'); process.exitCode = 1 }
  process.exit(process.exitCode || 0)
}
