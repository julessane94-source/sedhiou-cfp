import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'appelCandidature',
  title: 'Appel à candidatures',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'deadline',
      title: 'Date limite',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: { list: [{ title: 'Ouvert', value: 'open' }, { title: 'Fermé', value: 'closed' }] },
      initialValue: 'open',
    }),
    defineField({
      name: 'googleFormUrl',
      title: 'Lien du formulaire Google',
      type: 'url',
      description: 'Ex: https://docs.google.com/forms/d/e/.../viewform',
      validation: Rule => Rule.uri({ scheme: ['https'] }),
      initialValue: 'https://docs.google.com/forms/d/e/1FAIpQLSdMnxfMHGu7rviw3ki9YCHs1V_1eqgwNUl7uXFmMic2xzF6Uw/viewform?usp=header',
    }),
    defineField({ name: 'heroImage', title: 'Image principale', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'requirements', title: 'Conditions / Exigences', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'documents', title: 'Documents demandés', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'contactEmail', title: 'Email contact', type: 'string' }),
    defineField({ name: 'locations', title: 'Lieux', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'tags', title: 'Mots-clés', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'status' } },
})
