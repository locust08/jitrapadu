import { getPayload } from 'payload'
import config from '@/payload.config'
import { listPublishedPosts, parsePostQuery, PostQueryError } from '@/cms/posts-reader'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  const headers = { 'Cache-Control': 'no-store' }
  try {
    const query = parsePostQuery(new URL(request.url).searchParams)
    return Response.json(await listPublishedPosts(await getPayload({ config }), query), { headers })
  } catch (error) {
    return Response.json({ error: error instanceof PostQueryError ? 'Invalid query' : 'Content unavailable' }, { status: error instanceof PostQueryError ? 400 : 503, headers })
  }
}
