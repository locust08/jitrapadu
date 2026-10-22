import { buildConfig, getPayload, type Payload } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import * as collections from '../../src/cms/collections.ts'
import { disabledEmailAdapter } from '../../src/cms/contact-email.ts'
import { SiteSettings } from '../../src/cms/site-settings.ts'

export async function withTestPayload<T>(run: (payload: Payload, paths: {root:string; database:string; uploads:string}) => Promise<T>, options: {legacy?: boolean} = {}): Promise<T> {
  const root = await mkdtemp(path.join(tmpdir(), 'jitrapadu-cms-'))
  const paths = { root, database: path.join(root,'test.db'), uploads:path.join(root,'uploads') }
  let payload: Payload | undefined
  try {
    const configs = Object.values(collections).filter((value): value is typeof collections.Users => !!value && typeof value === 'object' && 'slug' in value)
    const config = buildConfig({ secret:randomUUID(), editor:lexicalEditor(), sharp, email: disabledEmailAdapter,
      db:sqliteAdapter({ wal: true, transactionOptions:{behavior:'immediate'},busyTimeout:0,client:{url:`file:${paths.database}`}}),
      collections:configs.filter(c=>!options.legacy||!['posts','enquiries','contact-rate-events'].includes(c.slug)).map(c=>c.slug==='media'?{...c,upload:{...(typeof c.upload==='object'?c.upload:{}),staticDir:paths.uploads}}:c),
      globals:[SiteSettings], typescript:{autoGenerate:false}, telemetry:false,
    })
    const previous=process.env.PAYLOAD_FORCE_DRIZZLE_PUSH
    process.env.PAYLOAD_FORCE_DRIZZLE_PUSH='true'
    try {payload = await getPayload({config, key:randomUUID()})}
    finally {if(previous===undefined)delete process.env.PAYLOAD_FORCE_DRIZZLE_PUSH;else process.env.PAYLOAD_FORCE_DRIZZLE_PUSH=previous}
    return await run(payload,paths)
  } finally {
    if(payload){const client=payload.db.drizzle.$client;await payload.destroy();client.close()}
    await rm(root,{recursive:true,force:true})
  }
}

export const body = (text = 'Published content') => ({ root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: null, children: [{ type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: null, children: [{ type: 'text', version: 1, text, detail: 0, format: 0, mode: 'normal', style: '' }] }] } })

export async function withSecondPayload<T>(first: Payload, paths: {database: string; uploads: string}, run: (payload: Payload) => Promise<T>): Promise<T> {
  const config = buildConfig({ secret: first.config.secret, editor: lexicalEditor(), sharp, email: disabledEmailAdapter,
    db: sqliteAdapter({ wal: true,  client: { url: `file:${paths.database}` }, transactionOptions: { behavior: 'immediate' }, busyTimeout: 0, push: false }),
    collections: Object.values(collections).filter((v): v is typeof collections.Users => !!v && typeof v === 'object' && 'slug' in v).map(c => c.slug === 'media' ? { ...c, upload: { ...(typeof c.upload === 'object' ? c.upload : {}), staticDir: paths.uploads } } : c),
    globals: [SiteSettings], typescript: { autoGenerate: false }, telemetry: false,
  })
  const other = await getPayload({ config, key: randomUUID() })
  try { return await run(other) } finally { const client = other.db.drizzle.$client; await other.destroy(); client.close() }
}
