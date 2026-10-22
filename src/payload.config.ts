import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'
import { Users, Media, SourcePages, Solutions, FAQs, Partners, Products, Posts, Enquiries, ContactRateEvents } from './cms/collections'
import { createContactEmailConfig } from './cms/contact-email'
import { SiteSettings } from './cms/site-settings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
mkdirSync(path.resolve(dirname, '../temp/cms'), { recursive: true })

if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is required. See .env.example and README-JITRAPADU.md.')

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: { user: 'users', importMap: { baseDir: dirname } },
  db: sqliteAdapter({ wal: true,  transactionOptions: { behavior: 'immediate' }, busyTimeout: 0, client: { url: process.env.DATABASE_URI || `file:${path.resolve(process.cwd(), 'temp/cms/payload.db')}` } }),
  editor: lexicalEditor(), sharp,
  email: createContactEmailConfig(process.env).adapter,
  collections: [Users, Media, SourcePages, Solutions, FAQs, Partners, Products, Posts, Enquiries, ContactRateEvents],
  globals: [SiteSettings],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
