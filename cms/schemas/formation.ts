import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'formation',
  title: 'Formation',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description courte', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Contenu', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'duration', title: 'Durée', type: 'string' }),
    defineField({ name: 'price', title: 'Prix', type: 'number' }),
    defineField({ name: 'startDate', title: 'Date de début', type: 'date' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'title', media: 'image' } }
})
