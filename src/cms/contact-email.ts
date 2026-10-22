import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import type { EmailAdapter, Payload } from 'payload'
import type { Enquiry } from '../payload-types'
import { validEmail } from './contact-validation'
export type ContactMail = { to: 'hello@jitrapadu.com'; from: string; replyTo: string; subject: string; text: string; messageId: string }
export type ContactTransport = { send(message: ContactMail): Promise<void> }
export const disabledEmailAdapter: EmailAdapter = () => ({ name: 'disabled-private-email', defaultFromAddress: 'disabled@localhost.invalid', defaultFromName: 'Jitrapadu', sendEmail: async () => { throw new Error('Email configuration unavailable') } })

export function createContactEmailConfig(env: Partial<NodeJS.ProcessEnv>): { configured: boolean; adapter: EmailAdapter } {
  const port = Number(env.SMTP_PORT), from = env.SMTP_FROM_ADDRESS || '', host = env.SMTP_HOST || ''
  const configured = !!host && !/[\s\p{Cc}]/u.test(host) && Number.isInteger(port) && port > 0 && port <= 65535 && validEmail(from) && ['true', 'false', undefined].includes(env.SMTP_SECURE) && !!env.SMTP_USER === !!env.SMTP_PASS && !/\p{Cc}/u.test(env.SMTP_FROM_NAME || '')
  if (!configured) return { configured: false, adapter: disabledEmailAdapter }
  const ready = nodemailerAdapter({
    skipVerify: true,
    defaultFromAddress: from, defaultFromName: env.SMTP_FROM_NAME || 'Jitrapadu Engineering',
    transportOptions: { host, port, secure: env.SMTP_SECURE === 'true', ...(env.SMTP_USER ? { auth: { user: env.SMTP_USER, pass: env.SMTP_PASS! } } : {}), connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 10000, logger: false, debug: false },
  })
  const adapter: EmailAdapter = args => ({ name: 'private-smtp', defaultFromAddress: from, defaultFromName: env.SMTP_FROM_NAME || 'Jitrapadu Engineering', sendEmail: async message => (await ready)(args).sendEmail(message) })
  return { configured: true, adapter }
}
export function buildContactMail(enquiry: Enquiry, from: string): ContactMail {
  if (!validEmail(from) || !validEmail(enquiry.email)) throw new Error('Email configuration unavailable')
  const fields = ['fullName', 'email', 'company', 'phone', 'jobTitle', 'projectLocation', 'solutionInterest', 'projectStage', 'timeline', 'quantity', 'message'] as const
  return { to: 'hello@jitrapadu.com', from, replyTo: enquiry.email, subject: 'New Jitrapadu website enquiry', text: fields.filter(k => enquiry[k] !== null && enquiry[k] !== undefined && enquiry[k] !== '').map(k => `${k}: ${enquiry[k]}`).join('\n\n'), messageId: `<jitrapadu-enquiry-${enquiry.id}@${from.split('@')[1]}>` }
}
export function contactTransport(payload: Payload, env: Partial<NodeJS.ProcessEnv>): ContactTransport | null {
  if (!createContactEmailConfig(env).configured) return null
  const from = env.SMTP_FROM_ADDRESS!
  return { async send(message) { await payload.sendEmail({ ...message, from }) } }
}
