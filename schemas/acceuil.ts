import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'acceuil',
  title: 'Accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Titre principal (Hero)',
      type: 'string',
      initialValue: 'Bienvenue au CFP SEDHIOU',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Image de fond (Hero)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Vidéo de fond (URL YouTube/Vimeo)',
      type: 'url',
      description: 'Alternative à l’image',
    }),
    defineField({
      name: 'sections',
      title: 'Sections de contenu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({ name: 'title', title: 'Titre de la section', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({
              name: 'mediaType',
              title: 'Type de média',
              type: 'string',
              options: { list: ['image', 'video', 'audio'] },
            }),
            defineField({ name: 'image', title: 'Image', type: 'image', hidden: ({ parent }) => parent?.mediaType !== 'image' }),
            defineField({ name: 'videoUrl', title: 'URL Vidéo (YouTube, Vimeo)', type: 'url', hidden: ({ parent }) => parent?.mediaType !== 'video' }),
            defineField({ name: 'audioUrl', title: 'URL Fichier Audio', type: 'file', hidden: ({ parent }) => parent?.mediaType !== 'audio' }),
            defineField({ name: 'link', title: 'Lien associé', type: 'url' }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Vidéo mise en avant',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titre', type: 'string' }),
        defineField({ name: 'url', title: 'URL YouTube/Vimeo', type: 'url' }),
        defineField({ name: 'caption', title: 'Légende', type: 'text' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta description', type: 'text' }),
        defineField({ name: 'ogImage', title: 'Image Open Graph', type: 'image' }),
      ],
    }),
    defineField({
      name: 'footerCta',
      title: 'Footer CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Texte', type: 'string' }),
        defineField({ name: 'link', title: 'Lien', type: 'url' }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Témoignages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'author', title: 'Auteur', type: 'string' }),
            defineField({ name: 'text', title: 'Message', type: 'text' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image' }),
          ],
        },
      ],
    }),
  ],
})
