import { getPayload, type Payload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '../../src/payload.config'
import { importDraftRecord, resolvePageMedia, verifyAsset, type DraftStore } from './import-data'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type ContentSlug = 'source-pages' | 'solutions' | 'faqs' | 'partners'
type SourceRecord = { importKey: string; sourceUrl: string; reviewNotes?: string; [key: string]: unknown }
type Asset = SourceRecord & { filename: string; localPath: string; sha256: string; bytes: number; kind: string; sourcePages: string[]; altCandidates: string[] }
type Page = SourceRecord & { title: string; slug: string; blocks: { type: string; text: string }[]; metadata: Record<string, string> }
type Dataset = { extractedAt: string; assets: Asset[]; pages: Page[]; faqs: SourceRecord[]; solutions: SourceRecord[]; siteSettings: SourceRecord & { socialLinks: string[]; directionsLinks: string[] }; conflicts: string[] }
type Result = { collection: string; key: string; status: 'created' | 'skipped' | 'failed'; error?: string }

function contentSlug(value: string): ContentSlug {
  if (value === 'source-pages' || value === 'solutions' || value === 'faqs' || value === 'partners') return value
  throw new Error(`Unsupported content collection: ${value}`)
}

function labelFromFilename(filename: string) {
  return decodeURIComponent(filename).replace(/^[a-f0-9]{12}-[a-f0-9]{24}_/, '').replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
}

export async function importOriginalSite(payload: Payload, sourceDirectory: string) {
  const root = path.resolve(sourceDirectory)
  const data = JSON.parse(await readFile(path.join(root, 'extracted-content.json'), 'utf8')) as Dataset
  if (!Array.isArray(data.pages) || !Array.isArray(data.assets) || !Array.isArray(data.faqs) || !Array.isArray(data.solutions)) throw new Error('Invalid extraction manifest')
  const downloaded = JSON.parse(await readFile(path.join(root, 'download-report.json'), 'utf8')) as { downloaded: number; failed: number }
  const extractedAt = new Date(data.extractedAt).toISOString()
  const results: Result[] = []
  const mediaIds = new Map<string, number>()
  const groups = new Map<string, Asset[]>()
  for (const asset of data.assets) {
    if (!asset.sha256) throw new Error(`Missing downloaded checksum: ${asset.sourceUrl}`)
    groups.set(asset.sha256, [...(groups.get(asset.sha256) || []), asset])
  }

  for (const [checksum, group] of groups) {
    const key = `original:media:${checksum}`
    try {
      // Verify every reference, even when its bytes deduplicate or its record already exists.
      for (const asset of group) await verifyAsset(root, asset)
      const existing = await payload.find({ collection: 'media', where: { importKey: { equals: key } }, limit: 1, depth: 0, overrideAccess: true })
      let document = existing.docs[0]
      if (!document) {
        const asset = group[0]
        document = await payload.create({
          collection: 'media', overrideAccess: true, filePath: path.resolve(root, asset.localPath),
          data: {
            importKey: key, label: labelFromFilename(asset.filename), alt: asset.altCandidates[0] || '',
            originalFilename: asset.filename.replace(/^[a-f0-9]{12}-/, ''), sourceUrl: asset.sourceUrl,
            sha256: checksum, reviewStatus: 'pending', extractedAt,
            sourceReferences: group.map(a => ({ url: a.sourceUrl, pages: a.sourcePages, altCandidates: a.altCandidates })),
            reviewNotes: 'Imported original-site asset. Confirm subject, brand name, crop and alt text before approval. Not publicly accessible while pending.',
          },
        })
      }
      for (const asset of group) mediaIds.set(asset.sourceUrl, document.id)
      results.push({ collection: 'media', key, status: existing.docs.length ? 'skipped' : 'created' })
    } catch (error) {
      results.push({ collection: 'media', key, status: 'failed', error: error instanceof Error ? error.message : String(error) })
    }
  }

  const store: DraftStore = {
    async findExisting(collection, key) {
      const found = await payload.find({ collection: contentSlug(collection), where: { importKey: { equals: key } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
      return found.docs[0]
    },
    async createDraft(collection, record) {
      const slug = contentSlug(collection)
      return payload.create({ collection: slug, data: record as RequiredDataFromCollectionSlug<ContentSlug>, draft: true, overrideAccess: true })
    },
  }
  const record = async (collection: ContentSlug, entry: Record<string, unknown> & { importKey: string }) => {
    try {
      const result = await importDraftRecord(store, collection, { ...entry, extractedAt })
      results.push({ collection, key: entry.importKey, status: result.status })
    } catch (error) {
      results.push({ collection, key: entry.importKey, status: 'failed', error: error instanceof Error ? error.message : String(error) })
    }
  }
  for (const page of data.pages) {
    if (await store.findExisting('source-pages', page.importKey)) {
      results.push({ collection: 'source-pages', key: page.importKey, status: 'skipped' })
      continue
    }
    let images: number[]
    try { images = resolvePageMedia(page.sourceUrl, data.assets, mediaIds) }
    catch (error) {
      results.push({ collection: 'source-pages', key: page.importKey, status: 'failed', error: error instanceof Error ? error.message : String(error) })
      continue
    }
    await record('source-pages', {
      importKey: page.importKey, title: page.title, slug: page.slug, sourceUrl: page.sourceUrl,
      body: page.blocks.map(b => b.text).join('\n\n'), sourceBlocks: page.blocks, sourceMetadata: page.metadata,
      reviewNotes: page.reviewNotes, media: [...new Set(images)],
    })
  }
  for (const entry of data.faqs) await record('faqs', entry)
  for (const entry of data.solutions) await record('solutions', entry)

  // Only logo candidates from the actual Notable Clients section are used, not footer/decorative images.
  const partnerURLs = JSON.parse(await readFile(path.join(root, 'partner-assets.json'), 'utf8')) as string[]
  for (const url of partnerURLs) {
    const asset = data.assets.find(a => a.sourceUrl === url)
    if (!asset) { results.push({ collection: 'partners', key: url, status: 'failed', error: 'Partner asset absent from manifest' }); continue }
    const logo = mediaIds.get(url)
    if (!logo) { results.push({ collection: 'partners', key: url, status: 'failed', error: 'Partner media failed import' }); continue }
    await record('partners', {
      importKey: `original:partner:${asset.sha256}`, name: labelFromFilename(asset.filename), logo,
      nameVerified: false, sourceUrl: 'https://www.jitrapadu.com/partners',
      reviewNotes: 'Unverified label derived from the source asset filename in Notable Clients. Confirm the brand name and whether it belongs in the new design before publishing.',
    })
  }

  const settingsKey = 'original:site-settings'
  try {
    const existing = await payload.findGlobal({ slug: 'site-settings', draft: true, overrideAccess: true })
    if (!existing.importKey) {
      const settings = data.siteSettings
      await payload.updateGlobal({ slug: 'site-settings', draft: true, overrideAccess: true, data: {
        companyName: String(settings.companyName), email: String(settings.email), phone: String(settings.phone),
        mobile: String(settings.mobile), fax: String(settings.fax), address: String(settings.address),
        sourceUrl: settings.sourceUrl, extractedAt, reviewNotes: settings.reviewNotes, importKey: settingsKey,
        socialLinks: settings.socialLinks.map(url => ({ url })), directionsLinks: settings.directionsLinks.map(url => ({ url })), _status: 'draft',
      } })
    }
    results.push({ collection: 'site-settings', key: settingsKey, status: existing.importKey ? 'skipped' : 'created' })
  } catch (error) {
    results.push({ collection: 'site-settings', key: settingsKey, status: 'failed', error: error instanceof Error ? error.message : String(error) })
  }
  const counts: Record<string, { created: number; skipped: number; failed: number }> = {}
  for (const result of results) {
    counts[result.collection] ||= { created: 0, skipped: 0, failed: 0 }
    counts[result.collection][result.status]++
  }
  const report = { importedAt: new Date().toISOString(), sourceDirectory: root, draftsOnly: true, sourceCounts: { pages: data.pages.length, assetURLs: data.assets.length, uniqueAssetChecksums: groups.size, faqs: data.faqs.length, solutions: data.solutions.length, partnerCandidates: partnerURLs.length }, downloads: downloaded, counts, conflicts: data.conflicts, results }
  await writeFile(path.join(root, 'payload-import-report.json'), JSON.stringify(report, null, 2))
  return report
}

async function main() {
  const payload = await getPayload({ config })
  try {
    const report = await importOriginalSite(payload, process.argv[2] || 'temp/original-site-import')
    console.log(JSON.stringify({ sourceCounts: report.sourceCounts, counts: report.counts, failures: report.results.filter(r => r.status === 'failed') }, null, 2))
    if (report.results.some(r => r.status === 'failed')) process.exitCode = 1
  } finally {
    const client = payload.db.drizzle.$client
    await payload.destroy()
    client.close()
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1 })
}
