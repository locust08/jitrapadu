import { getPayload } from 'payload'
import config from '@/payload.config'
import { getPublishedPost } from '@/cms/posts-reader'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const headers = { 'Cache-Control': 'no-store' }
  try {
    const post = await getPublishedPost(await getPayload({ config }), (await params).slug)
    return Response.json(post || { error: 'Not found' }, { status: post ? 200 : 404, headers })
  } catch {
    return Response.json({ error: 'Content unavailable' }, { status: 503, headers })
  }
}
