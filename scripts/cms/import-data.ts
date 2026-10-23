import { readFile, realpath } from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'

export interface DraftStore {
  findExisting(collection: string, key: string): Promise<unknown>
  createDraft(collection: string, data: Record<string, unknown>): Promise<unknown>
}

export async function importDraftRecord(store: DraftStore, collection: string, data: Record<string, unknown>) {
  if (typeof data.importKey !== 'string' || !data.importKey) throw new Error('A stable importKey is required')
  const existing = await store.findExisting(collection, data.importKey)
  if (existing) return { status: 'skipped' as const, document: existing }
  const document = await store.createDraft(collection, { ...data, _status: 'draft' })
  return { status: 'created' as const, document }
}

export async function verifyAsset(root: string, asset: { localPath: string; sha256: string }) {
  const directory = await realpath(root)
  const candidate = path.resolve(directory, asset.localPath)
  if (!candidate.startsWith(directory + path.sep)) throw new Error('Asset path is outside the extraction directory')
  const resolved = await realpath(candidate)
  if (!resolved.startsWith(directory + path.sep)) throw new Error('Asset symlink points outside the extraction directory')
  const buffer = await readFile(resolved)
  if (createHash('sha256').update(buffer).digest('hex') !== asset.sha256) throw new Error(`Asset checksum mismatch: ${asset.localPath}`)
  return { buffer, path: resolved }
}

export function resolvePageMedia(sourceUrl: string, assets: { sourceUrl: string; sourcePages: string[] }[], mediaIds: Map<string, number>) {
  const required = assets.filter(asset => asset.sourcePages.includes(sourceUrl))
  const missing = required.filter(asset => !mediaIds.has(asset.sourceUrl))
  if (missing.length) throw new Error(`Missing imported media for ${sourceUrl}: ${missing.map(asset => asset.sourceUrl).join(', ')}`)
  return [...new Set(required.map(asset => mediaIds.get(asset.sourceUrl)!))]
}
