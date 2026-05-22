import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'actualite',
  title: 'Actualité',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'publishedAt', title: 'Date de publication', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Résumé', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Contenu', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'coverImage', title: 'Image de couverture', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'videoUrl', title: 'URL de la vidéo (YouTube/Vimeo)', type: 'url', description: 'Ex: https://www.youtube.com/embed/...' }),
    defineField({ name: 'gallery', title: 'Galerie d\'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } }
})