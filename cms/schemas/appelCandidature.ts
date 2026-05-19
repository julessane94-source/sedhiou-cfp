import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'appelCandidature',
  title: 'Appel à candidatures',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'deadline', title: 'Date limite', type: 'date' }),
    defineField({ name: 'status', title: 'Statut', type: 'string', options: { list: ['open', 'closed'] }, initialValue: 'open' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ]
})
