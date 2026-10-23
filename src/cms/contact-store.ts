import { createHmac, randomUUID } from 'node:crypto'
import { createLocalReq, type Payload, type PayloadRequest, type Where } from 'payload'
import { ContactError, type ContactInput } from './contact-validation'
export type ContactReceipt = { kind: 'created' | 'replay'; enquiryId: number }

function busy(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  return /SQLITE_BUSY|SQLITE_LOCKED|database is locked/i.test(error.message) || busy(error.cause)
}
export async function withContactTransaction<T>(payload: Payload, run: (req: PayloadRequest) => Promise<T>): Promise<T> {
  if (!payload.db.sessions) throw new ContactError(503, 'storage')
  const sessions = payload.db.sessions
  const deadline = Date.now() + 3000
  while (true) {
    try {
      // Own the driver's transaction promise: Payload's lifted commit helper swallows commit errors.
      return await payload.db.drizzle.transaction(async tx => {
        const id = randomUUID()
        sessions[id] = { db: tx, resolve: async () => undefined, reject: async () => undefined }
        try {
          const req = await createLocalReq({ req: { transactionID: id } }, payload)
          return await run(req)
        } finally { delete sessions[id] }
      })
    } catch (error) {
      if (busy(error) && Date.now() < deadline) { await new Promise(resolve => setTimeout(resolve, 25 + Math.random() * 30)); continue }
      if (error instanceof ContactError) throw error
      throw new ContactError(503, 'storage')
    }
  }
}
function hash(payload: Payload, purpose: string, value: string): string {
  const key = createHmac('sha256', payload.config.secret).update(`jitrapadu-contact:${purpose}:v1`).digest()
  return createHmac('sha256', key).update(value).digest('hex')
}
export async function storeContact(payload: Payload, key: string, input: ContactInput, now: () => Date = () => new Date()): Promise<ContactReceipt> {
  const idempotencyHash = hash(payload, 'idempotency', key.toLowerCase())
  const canonical = JSON.stringify(Object.fromEntries(Object.entries(input).filter(([,v]) => v !== undefined).sort(([a], [b]) => a.localeCompare(b))))
  const payloadFingerprint = hash(payload, 'fingerprint', canonical), emailHash = hash(payload, 'email', input.email)
  const receipt = await withContactTransaction(payload, async req => {
    const existing = (await payload.find({ collection: 'enquiries', req, overrideAccess: true, depth: 0, limit: 1, where: { idempotencyHash: { equals: idempotencyHash } } })).docs[0]
    if (existing) {
      if (existing.payloadFingerprint !== payloadFingerprint) throw new ContactError(409, 'idempotency-conflict')
      return { kind: 'replay' as const, enquiryId: existing.id }
    }
    const date = now(), time = date.getTime()
    const emailWhere: Where = { and: [{ emailHash: { equals: emailHash } }, { acceptedAt: { greater_than: new Date(time - 900000).toISOString() } }] }
    const globalWhere: Where = { acceptedAt: { greater_than: new Date(time - 3600000).toISOString() } }
    for (const [where, limit, window] of [[emailWhere, 5, 900000], [globalWhere, 100, 3600000]] as const) {
      const events = await payload.find({ collection: 'contact-rate-events', req, overrideAccess: true, depth: 0, where, limit, sort: 'acceptedAt' })
      if (events.totalDocs >= limit) {
        const earliest = Date.parse(events.docs[Math.min(events.totalDocs - limit, events.docs.length - 1)].acceptedAt)
        throw new ContactError(429, 'rate-limit', undefined, Math.max(1, Math.ceil((earliest + window - time) / 1000)))
      }
    }
    const enquiry = await payload.create({ collection: 'enquiries', req, overrideAccess: true, data: { ...input, status: 'new', notificationStatus: 'pending', consentVersion: 'enquiry-contact-v1', consentText: 'I agree to be contacted by Jitrapadu Engineering regarding my enquiry.', receivedAt: date.toISOString(), idempotencyHash, payloadFingerprint } })
    await payload.create({ collection: 'contact-rate-events', req, overrideAccess: true, data: { emailHash, acceptedAt: date.toISOString(), expiresAt: new Date(time + 3600000).toISOString() } })
    await payload.delete({ collection: 'contact-rate-events', req, overrideAccess: true, where: { expiresAt: { less_than_equal: date.toISOString() } } })
    return { kind: 'created' as const, enquiryId: enquiry.id }
  })
  // Payload's adapter can swallow a commit failure. Confirm durable visibility before acknowledging.
  const persisted = await payload.findByID({ collection: 'enquiries', id: receipt.enquiryId, depth: 0, overrideAccess: true }).catch(() => null)
  if (!persisted || persisted.idempotencyHash !== idempotencyHash || persisted.payloadFingerprint !== payloadFingerprint) throw new ContactError(503, 'storage')
  return receipt
}
