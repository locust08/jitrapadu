import type { Payload } from 'payload'
import { ContactError, parseContactRequest } from './contact-validation'
import { storeContact } from './contact-store'
import { notifyEnquiry } from './contact-notifications'
import type { ContactTransport } from './contact-email'
const headers = { 'Cache-Control': 'no-store' }
export async function handleContact(request: Request, deps: { payload: Payload; allowedOrigins: Set<string>; transport: ContactTransport | null; now?: () => Date }): Promise<Response> {
  const receipt = () => Response.json({ message: 'Thank you. Your enquiry has been received.' }, { status: 202, headers })
  try {
    const { key, input, honeypot } = await parseContactRequest(request, deps.allowedOrigins)
    if (honeypot) return receipt()
    const saved = await storeContact(deps.payload, key, input, deps.now)
    if (saved.kind === 'created') {
      // A mail/status failure must never invalidate an already durable receipt.
      await notifyEnquiry(deps.payload, saved.enquiryId, deps.transport, deps.now).catch(() => undefined)
    }
    return receipt()
  } catch (error) {
    const safe = error instanceof ContactError ? error : new ContactError(503, 'storage')
    return Response.json({ error: safe.code, ...(safe.fields ? { fields: safe.fields } : {}) }, { status: safe.status, headers: { ...headers, ...(safe.retryAfter ? { 'Retry-After': String(safe.retryAfter) } : {}) } })
  }
}
