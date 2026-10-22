import { getPayload } from 'payload'
import config from '@/payload.config'
import { handleContact } from '@/cms/contact-handler'
import { contactOrigins } from '@/cms/contact-validation'
import { contactTransport } from '@/cms/contact-email'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    return handleContact(request, { payload, allowedOrigins: contactOrigins(process.env), transport: contactTransport(payload, process.env) })
  } catch {
    return Response.json({ error: 'storage' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
