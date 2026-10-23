import type { Payload, Where } from 'payload'
import type { Post } from '../payload-types'
import type { PublicImage } from './content-types'
import { postCategories, type PostCategory } from './posts'
import { toPublicImage } from './public-model'

export type PostQuery = { categories: PostCategory[]; page: number; limit: number }
export type PostSummary = { slug: string; title: string; category: PostCategory; excerpt: string | null; publicationDate: string | null; eventStart: string | null; eventLocation: string | null; banner: PublicImage | null }
export type PostDetail = PostSummary & { body: Post['body']; related: PostSummary[] }
export type PostPage = { docs: PostSummary[]; page: number; limit: number; totalDocs: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean }
export class PostQueryError extends Error {}

export function parsePostQuery(params: URLSearchParams): PostQuery {
  for (const key of ['category', 'page', 'limit']) if (params.getAll(key).length > 1) throw new PostQueryError('Invalid query')
  const number = (name: string, fallback: number, max: number) => {
    const raw = params.get(name)
    if (raw === null) return fallback
    const n = Number(raw)
    if (!/^[1-9]\d*$/.test(raw) || !Number.isSafeInteger(n) || n > max) throw new PostQueryError('Invalid query')
    return n
  }
  const categories = params.has('category') ? params.get('category')!.split(',') : [...postCategories]
  if (categories.some(c => !postCategories.includes(c as PostCategory)) || new Set(categories).size !== categories.length) throw new PostQueryError('Invalid category')
  return { categories: categories as PostCategory[], page: number('page', 1, Number.MAX_SAFE_INTEGER), limit: number('limit', 12, 50) }
}

const anonymous = { depth: 0, draft: false, overrideAccess: false, user: null } as const
const published: Where = { _status: { equals: 'published' } }
async function summarize(payload: Payload, post: Post): Promise<PostSummary> {
  let banner: PublicImage | null = null
  const id = typeof post.banner === 'number' ? post.banner : post.banner?.id
  if (id) {
    const media = await payload.find({ collection: 'media', ...anonymous, limit: 1, where: { and: [{ id: { equals: id } }, { reviewStatus: { equals: 'approved' } }] } })
    banner = toPublicImage(media.docs[0] || null) || null
  }
  return { slug: post.slug, title: post.title, category: post.category, excerpt: post.excerpt || null, publicationDate: post.publicationDate || null, eventStart: post.eventStart || null, eventLocation: post.eventLocation || null, banner }
}
export async function listPublishedPosts(payload: Payload, query: PostQuery): Promise<PostPage> {
  const found = await payload.find({ collection: 'posts', ...anonymous, page: query.page, limit: query.limit, sort: ['-publicationDate', '-id'], where: { and: [published, { category: { in: query.categories } }] } })
  return { docs: await Promise.all(found.docs.map(p => summarize(payload, p))), page: found.page || query.page, limit: found.limit, totalDocs: found.totalDocs, totalPages: found.totalPages, hasNextPage: found.hasNextPage, hasPrevPage: found.hasPrevPage }
}
export async function getPublishedPost(payload: Payload, slug: string): Promise<PostDetail | null> {
  const post = (await payload.find({ collection: 'posts', ...anonymous, limit: 1, where: { and: [published, { slug: { equals: slug } }] } })).docs[0]
  if (!post) return null
  const ids = [...new Set((post.relatedPosts || []).map(p => typeof p === 'number' ? p : p.id))].filter(id => id !== post.id)
  const manual = ids.length ? (await payload.find({ collection: 'posts', ...anonymous, pagination: false, where: { and: [published, { id: { in: ids } }] } })).docs : []
  const byId = new Map(manual.map(p => [p.id, p]))
  const related = ids.flatMap(id => byId.get(id) ? [byId.get(id)!] : []).slice(0, 3)
  if (related.length < 3) {
    const fill = await payload.find({ collection: 'posts', ...anonymous, limit: 3 - related.length, sort: ['-publicationDate', '-id'], where: { and: [published, { category: { equals: post.category } }, { id: { not_in: [post.id, ...related.map(p => p.id)] } }] } })
    related.push(...fill.docs)
  }
  return { ...await summarize(payload, post), body: post.body, related: await Promise.all(related.map(p => summarize(payload, p))) }
}
