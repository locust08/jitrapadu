import type { CollectionConfig, Field } from 'payload'
import { approvedMediaOrAuthenticated, authenticated, isAdmin } from './access'
import path from 'node:path'
import { solutionGroups } from './content-types'

export { provenance } from './editorial-fields'
import { provenance, contentAccess } from './editorial-fields'
export { Posts } from './posts'

export const Users: CollectionConfig = {
  slug: 'users', auth: true, admin: { useAsTitle: 'email' },
  access: { admin: authenticated, create: isAdmin, read: isAdmin, update: isAdmin, delete: isAdmin },
  hooks: {
    beforeChange: [async ({ data, operation, req }) => {
      if (operation === 'create') {
        const existing = await req.payload.count({ collection: 'users', overrideAccess: true, req })
        if (existing.totalDocs === 0) return { ...data, role: 'admin' }
      }
      return data
    }],
  },
  fields: [{ name: 'role', type: 'select', required: true, defaultValue: 'editor', options: ['admin', 'editor'], admin: { condition: (_data, _siblings, { user }) => user?.role === 'admin' }, access: { create: isAdmin, update: isAdmin } }],
}

export const Media: CollectionConfig = {
  slug: 'media', admin: { useAsTitle: 'label', description: 'Imported assets are private until approved. Review provenance and intended usage first.' },
  access: { read: approvedMediaOrAuthenticated, create: authenticated, update: authenticated, delete: isAdmin },
  upload: {
    staticDir: process.env.PAYLOAD_UPLOAD_DIR || path.resolve(process.cwd(), 'temp/cms/uploads'),
    mimeTypes: ['image/*', 'video/mp4'],
    adminThumbnail: undefined,
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'alt', type: 'text' },
    { name: 'reviewStatus', type: 'select', required: true, defaultValue: 'pending', options: ['pending', 'approved', 'rejected'] },
    { name: 'sha256', type: 'text', index: true, admin: { readOnly: true }, access: { read: authenticated } },
    { name: 'originalFilename', type: 'text', admin: { readOnly: true }, access: { read: authenticated } },
    { name: 'sourceReferences', type: 'json', admin: { readOnly: true }, access: { read: authenticated } },
    ...provenance,
  ],
}

export const SourcePages: CollectionConfig = {
  slug: 'source-pages', versions: { drafts: true }, access: { ...contentAccess, read: authenticated },
  admin: { useAsTitle: 'title', description: 'Original-site source material. These drafts do not replace the current public pages.' },
  fields: [
    { name: 'title', type: 'text', required: true }, { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'sourceBlocks', type: 'json', admin: { readOnly: true }, access: { read: authenticated } },
    { name: 'sourceMetadata', type: 'json', admin: { readOnly: true }, access: { read: authenticated } },
    { name: 'media', type: 'relationship', relationTo: 'media', hasMany: true }, ...provenance,
  ],
}

export const Solutions: CollectionConfig = {
  slug: 'solutions', versions: { drafts: true }, access: contentAccess, admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true }, { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'summary', type: 'textarea', admin: { description: 'Optional homepage card summary.' } },
    { name: 'cardImage', type: 'relationship', relationTo: 'media', admin: { description: 'Homepage image; only approved images appear.' } },
    { name: 'media', type: 'relationship', relationTo: 'media', hasMany: true }, ...provenance,
  ],
}

export const FAQs: CollectionConfig = {
  slug: 'faqs', versions: { drafts: true }, access: contentAccess, admin: { useAsTitle: 'question' },
  fields: [groupField(false), orderField(), { name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }, ...provenance],
}

export const Partners: CollectionConfig = {
  slug: 'partners', versions: { drafts: true }, access: contentAccess, admin: { useAsTitle: 'name', description: 'Labels derived from source filenames require brand verification.' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'relationship', relationTo: 'media', required: true },
    { name: 'nameVerified', type: 'checkbox', defaultValue: false }, orderField(), ...provenance,
  ],
}

function groupField(required = true): Field {
  return { name: 'solutionGroup', type: 'select', required, options: [...solutionGroups], admin: { description: 'Only tower-group products and FAQs currently have a public listing. Unassigned FAQs stay off the website.' } }
}
function orderField(required = false): Field {
  return { name: 'displayOrder', type: 'number', required, defaultValue: 0, min: 0, validate: (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value) && value >= 0 || 'Use a finite nonnegative number.' }
}
export const Products: CollectionConfig = {
  slug: 'products', versions: { drafts: true }, access: contentAccess,
  admin: { useAsTitle: 'title', description: 'Reviewed listing entries, not SKUs. Tower entries appear in Product Range after publication. Other groups await their public pages.' },
  fields: [
    { name: 'title', type: 'text', required: true }, { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea', required: true }, groupField(),
    { name: 'entryType', type: 'select', required: true, defaultValue: 'product', options: ['product', 'configuration', 'service'] },
    { name: 'image', type: 'relationship', relationTo: 'media' }, orderField(true), ...provenance,
  ],
}

export { Enquiries, ContactRateEvents } from './enquiries'
