import type { Field } from 'payload'
import { authenticated, isAdmin, publishedOrAuthenticated } from './access'

export const provenance: Field[] = [
  { name: 'importKey', type: 'text', unique: true, index: true, admin: { readOnly: true }, access: { read: authenticated } },
  { name: 'sourceUrl', type: 'text', admin: { readOnly: true }, access: { read: authenticated } },
  { name: 'extractedAt', type: 'date', admin: { readOnly: true }, access: { read: authenticated } },
  { name: 'reviewNotes', type: 'textarea', access: { read: authenticated } },
]

export const contentAccess = { read: publishedOrAuthenticated, readVersions: authenticated, create: authenticated, update: authenticated, delete: isAdmin }
