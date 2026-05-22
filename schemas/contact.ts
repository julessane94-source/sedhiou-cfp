import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Sous-titre', type: 'text' }),
    defineField({ name: 'address', title: 'Adresse', type: 'text' }),
    defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'hours', title: 'Horaires', type: 'text' }),
    defineField({ name: 'mapEmbedUrl', title: 'Carte Google Maps', type: 'url' }),
  ],
})
