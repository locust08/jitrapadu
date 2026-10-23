import { randomUUID } from 'node:crypto'
import type { Payload, Where } from 'payload'
import { withContactTransaction } from './contact-store'
import { buildContactMail, type ContactTransport } from './contact-email'

export async function notifyEnquiry(payload: Payload, id: number, transport: ContactTransport | null, now: () => Date = () => new Date()): Promise<'sent' | 'failed' | 'not-configured' | 'skipped'> {
  const claim = randomUUID()
  const enquiry = await withContactTransaction(payload, async req => {
    const record = await payload.findByID({ collection: 'enquiries', id, req, overrideAccess: true, depth: 0 })
    const date = now()
    if (record.notificationStatus === 'sent' || (record.notificationStatus === 'sending' && record.notificationLeaseUntil && Date.parse(record.notificationLeaseUntil) > date.getTime())) return null
    if (!transport) {
      await payload.update({ collection: 'enquiries', id, req, overrideAccess: true, data: { notificationStatus: 'not-configured', notificationError: 'configuration', notificationClaim: null, notificationLeaseUntil: null } })
      return null
    }
    return payload.update({ collection: 'enquiries', id, req, overrideAccess: true, data: { notificationStatus: 'sending', notificationClaim: claim, notificationLeaseUntil: new Date(date.getTime() + 300000).toISOString(), notificationAttempts: (record.notificationAttempts || 0) + 1, notificationAttemptAt: date.toISOString(), notificationError: null } })
  })
  if (!enquiry) {
    const record = await payload.findByID({ collection: 'enquiries', id, overrideAccess: true, depth: 0 })
    return record.notificationStatus === 'not-configured' ? 'not-configured' : 'skipped'
  }
  let status: 'sent' | 'failed' = 'sent', category: 'timeout' | 'transport' | null = null
  try {
    // The transport replaces this configured sender; fake transports use an inert sender.
    const from = payload.email.defaultFromAddress
    await transport!.send(buildContactMail(enquiry, from))
  } catch (error) {
    status = 'failed'
    category = error && typeof error === 'object' && 'code' in error && error.code === 'ETIMEDOUT' ? 'timeout' : 'transport'
  }
  await withContactTransaction(payload, async req => {
    const record = await payload.findByID({ collection: 'enquiries', id, req, overrideAccess: true, depth: 0 })
    if (record.notificationClaim !== claim) return
    await payload.update({ collection: 'enquiries', id, req, overrideAccess: true, data: { notificationStatus: status, notificationError: category, notificationClaim: null, notificationLeaseUntil: null } })
  })
  return status
}
export async function retryNotifications(payload: Payload, transport: ContactTransport | null, options: { limit?: number; shouldStop?: () => boolean } = {}): Promise<{sent: number; failed: number; notConfigured: number; skipped: number}> {
  const limit = options.limit ?? 100
  if (!Number.isInteger(limit) || limit < 1 || limit > 500) throw new Error('Invalid retry limit')
  const where: Where = { or: [{ notificationStatus: { in: ['pending', 'failed', 'not-configured'] } }, { and: [{ notificationStatus: { equals: 'sending' } }, { notificationLeaseUntil: { less_than_equal: new Date().toISOString() } }] }] }
  const records = await payload.find({ collection: 'enquiries', where, limit, sort: ['receivedAt', 'id'], overrideAccess: true, depth: 0 })
  const report = { sent: 0, failed: 0, notConfigured: 0, skipped: 0 }
  for (const record of records.docs) {
    if (options.shouldStop?.()) break
    try { const result = await notifyEnquiry(payload, record.id, transport); report[result === 'not-configured' ? 'notConfigured' : result]++ }
    catch { report.failed++ }
  }
  return report
}
