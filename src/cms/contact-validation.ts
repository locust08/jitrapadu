export const solutionInterests = ['Telecom Tower & Monopole', 'Rapid Deployment System', 'Smart Pole & Lamp Pole', 'Custom Steel Fabrication', 'Others'] as const
export const projectStages = ['Planning', 'Tender', 'Design', 'Fabrication', 'Deployment', 'Maintenance / Upgrade'] as const
export type ContactInput = {
  fullName: string; email: string; message: string; consent: true
  company?: string; phone?: string; jobTitle?: string; projectLocation?: string
  solutionInterest?: typeof solutionInterests[number]; projectStage?: typeof projectStages[number]
  timeline?: string; quantity?: number
}
export class ContactError extends Error {
  constructor(public status: number, public code: string, public fields?: string[], public retryAfter?: number) { super(code) }
}
export function contactOrigins(env: Partial<NodeJS.ProcessEnv>): Set<string> {
  const entries = (env.CONTACT_ALLOWED_ORIGINS ?? env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001').split(',').map(s => s.trim())
  for (const s of entries) {
    const u = new URL(s)
    if (!['http:', 'https:'].includes(u.protocol) || u.origin !== s || u.username || u.password) throw new Error('Invalid contact origin configuration')
  }
  return new Set(entries)
}
export function validEmail(value: string): boolean {
  if (value.length > 254 || /[\s\p{Cc}]/u.test(value)) return false
  const parts = value.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  return local.length > 0 && local.length <= 64 && !local.startsWith('.') && !local.endsWith('.') && !local.includes('..') && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) && domain.includes('.') && domain.split('.').every(s => s.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(s))
}
export async function parseContactRequest(request: Request, allowedOrigins: Set<string>): Promise<{ key: string; input: ContactInput; honeypot: boolean }> {
  if (!allowedOrigins.has(request.headers.get('origin') || '')) throw new ContactError(403, 'origin')
  if (!/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(request.headers.get('content-type') || '')) throw new ContactError(415, 'content-type')
  const key = request.headers.get('idempotency-key') || ''
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)) throw new ContactError(400, 'idempotency-key')
  const reader = request.body?.getReader()
  if (!reader) throw new ContactError(400, 'json')
  const chunks: Uint8Array[] = []; let length = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > 16384) { await reader.cancel(); throw new ContactError(413, 'body-size') }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  let raw: unknown
  try { raw = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks))) } catch { throw new ContactError(400, 'json') }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new ContactError(422, 'fields', ['body'])
  const data = raw as Record<string, unknown>, errors: string[] = []
  const known = ['fullName', 'email', 'message', 'consent', 'company', 'phone', 'jobTitle', 'projectLocation', 'solutionInterest', 'projectStage', 'timeline', 'quantity', 'website']
  if (Object.keys(data).some(k => !known.includes(k))) errors.push('body')
  const text = (key: string, max: number, min = 0, noControls = false) => {
    const v = data[key]
    if (v === undefined && min === 0) return undefined
    if (typeof v !== 'string') { errors.push(key); return undefined }
    const normalized = v.trim()
    if (normalized.length < min || normalized.length > max || (noControls && /\p{Cc}/u.test(v))) errors.push(key)
    return normalized || undefined
  }
  const fullName = text('fullName', 120, 2, true), email = text('email', 254, 1, true)?.toLowerCase(), message = text('message', 5000, 10)
  if (email && !validEmail(email)) errors.push('email')
  if (data.consent !== true) errors.push('consent')
  const optional = { company: text('company', 200), phone: text('phone', 40, 0, true), jobTitle: text('jobTitle', 200), projectLocation: text('projectLocation', 200), timeline: text('timeline', 120) }
  const solutionInterest = text('solutionInterest', 100), projectStage = text('projectStage', 100)
  if (solutionInterest && !solutionInterests.includes(solutionInterest as ContactInput['solutionInterest'] & string)) errors.push('solutionInterest')
  if (projectStage && !projectStages.includes(projectStage as ContactInput['projectStage'] & string)) errors.push('projectStage')
  const quantity = data.quantity
  if (quantity !== undefined && (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 1000000)) errors.push('quantity')
  if (data.website !== undefined && typeof data.website !== 'string') errors.push('website')
  if (errors.length) throw new ContactError(422, 'fields', [...new Set(errors)])
  const input: ContactInput = { fullName: fullName!, email: email!, message: message!, consent: true }
  Object.assign(input, Object.fromEntries(Object.entries(optional).filter(([,v]) => v !== undefined)))
  if (solutionInterest) input.solutionInterest = solutionInterest as ContactInput['solutionInterest']
  if (projectStage) input.projectStage = projectStage as ContactInput['projectStage']
  if (quantity !== undefined) input.quantity = quantity as number
  return { key: key.toLowerCase(), input, honeypot: typeof data.website === 'string' && data.website.length > 0 }
}
