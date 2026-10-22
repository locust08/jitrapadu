import { ValidationError, type CollectionConfig } from 'payload'
import { contentAccess, provenance } from './editorial-fields'

export const postCategories = ['news', 'event', 'csr'] as const
export type PostCategory = typeof postCategories[number]

export const Posts: CollectionConfig = {
  slug: 'posts', versions: { drafts: true }, access: contentAccess,
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', '_status', 'publicationDate'], listSearchableFields: ['title', 'slug'], description: 'Filter Category to review News, Events or CSR. Proposed activities must be confirmed before publication.' },
  hooks: { beforeValidate: [({ data, originalDoc }) => {
    if (!data) return data
    const merged = { ...originalDoc, ...data }
    if (merged._status === 'published') {
      if (merged.category === 'event') {
        const errors = []
        if (!merged.eventStart || !Number.isFinite(Date.parse(merged.eventStart))) errors.push({ path: 'eventStart', message: 'Confirm a valid event start date before publication.' })
        if (typeof merged.eventLocation !== 'string' || !merged.eventLocation.trim()) errors.push({ path: 'eventLocation', message: 'Confirm the event location before publication.' })
        if (errors.length) throw new ValidationError({ collection: 'posts', errors })
      }
      if (!merged.publicationDate) data.publicationDate = new Date().toISOString()
    }
    return data
  }] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'category', type: 'select', required: true, options: [...postCategories], index: true },
    { name: 'body', type: 'richText', required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'banner', type: 'relationship', relationTo: 'media' },
    { name: 'publicationDate', type: 'date', index: true },
    { name: 'eventStart', type: 'date' },
    { name: 'eventLocation', type: 'text' },
    { name: 'relatedPosts', type: 'relationship', relationTo: 'posts', hasMany: true },
    ...provenance,
  ],
}
