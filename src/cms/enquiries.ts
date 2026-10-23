import type { CollectionConfig, Field } from 'payload'
import { isAdmin } from './access'
import { projectStages, solutionInterests } from './contact-validation'
const deny = () => false
const serviceField = (field: Field): Field => ({ ...field, admin: { ...('admin' in field ? field.admin : {}), readOnly: true }, access: { create: deny, update: deny } } as Field)
const inboxAccess = { create: deny, read: isAdmin, update: isAdmin, delete: isAdmin }
export const Enquiries: CollectionConfig = {
  slug: 'enquiries', access: inboxAccess,
  admin: { useAsTitle: 'fullName', hidden: ({ user }) => user?.role !== 'admin', defaultColumns: ['fullName', 'email', 'status', 'notificationStatus', 'receivedAt'] },
  fields: [
    { name: 'fullName', type: 'text', required: true }, { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea', required: true },
    ...['company', 'phone', 'jobTitle', 'projectLocation', 'timeline'].map(name => ({ name, type: 'text' as const })),
    { name: 'solutionInterest', type: 'select', options: [...solutionInterests] },
    { name: 'projectStage', type: 'select', options: [...projectStages] },
    { name: 'quantity', type: 'number', min: 1, max: 1000000 },
    { name: 'status', type: 'select', required: true, defaultValue: 'new', options: ['new', 'in-progress', 'replied', 'closed'] },
    ...([
      { name: 'consent', type: 'checkbox', required: true },
      { name: 'consentVersion', type: 'text', required: true }, { name: 'consentText', type: 'textarea', required: true },
      { name: 'receivedAt', type: 'date', required: true },
      { name: 'idempotencyHash', type: 'text', required: true, unique: true, index: true },
      { name: 'payloadFingerprint', type: 'text', required: true },
      { name: 'notificationStatus', type: 'select', required: true, defaultValue: 'pending', options: ['pending', 'sending', 'sent', 'failed', 'not-configured'], index: true },
      { name: 'notificationAttempts', type: 'number', defaultValue: 0 },
      { name: 'notificationAttemptAt', type: 'date' }, { name: 'notificationError', type: 'select', options: ['configuration', 'timeout', 'transport', 'state-storage'] },
      { name: 'notificationLeaseUntil', type: 'date' }, { name: 'notificationClaim', type: 'text' },
    ] as Field[]).map(serviceField),
  ],
}
export const ContactRateEvents: CollectionConfig = {
  slug: 'contact-rate-events', access: { ...inboxAccess, update: deny },
  admin: { hidden: ({ user }) => user?.role !== 'admin', description: 'Private rolling quota records; expired records are cleared during accepted submissions.' },
  fields: [
    { name: 'emailHash', type: 'text', required: true, index: true },
    { name: 'acceptedAt', type: 'date', required: true, index: true },
    { name: 'expiresAt', type: 'date', required: true, index: true },
  ],
}
