import type { GlobalConfig } from 'payload'
import { authenticated, isAdmin } from './access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings', versions: { drafts: true },
  // Site settings are review-only until public frontend integration is enabled.
  access: { read: authenticated, update: authenticated, readVersions: authenticated },
  fields: [
    { name: 'companyName', type: 'text' }, { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' }, { name: 'mobile', type: 'text' }, { name: 'fax', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'socialLinks', type: 'array', fields: [{ name: 'url', type: 'text', required: true }] },
    { name: 'directionsLinks', type: 'array', fields: [{ name: 'url', type: 'text', required: true }] },
    { name: 'sourceUrl', type: 'text', admin: { readOnly: true } },
    { name: 'extractedAt', type: 'date', admin: { readOnly: true } },
    { name: 'importKey', type: 'text', admin: { readOnly: true }, access: { update: isAdmin } },
    { name: 'reviewNotes', type: 'textarea' },
  ],
}
