import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageAbout',
  title: 'À propos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'À propos du CFP SEDHIOU',
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Image de présentation',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
