import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aPropos',
  title: 'À propos',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Titre principal', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Sous-titre', type: 'text' }),
    defineField({ name: 'mission', title: 'Mission', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'vision', title: 'Vision', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'stats', title: 'Statistiques', type: 'array', of: [{ type: 'object', fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }] }] }),
    defineField({ name: 'values', title: 'Valeurs', type: 'array', of: [{ type: 'object', fields: [{ name: 'icon', type: 'string' }, { name: 'title', type: 'string' }, { name: 'description', type: 'text' }] }] }),
    defineField({ name: 'team', title: 'Équipe', type: 'array', of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'role', type: 'string' }, { name: 'image', type: 'image' }] }] }),
    // Nouveaux champs
    defineField({
      name: 'timeline',
      title: 'Chronologie / Histoire',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', type: 'string', title: 'Année' },
          { name: 'title', type: 'string', title: 'Titre' },
          { name: 'description', type: 'text', title: 'Description' }
        ]
      }]
    }),
    defineField({
      name: 'partners',
      title: 'Partenaires',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Nom' },
          { name: 'logo', type: 'image', title: 'Logo' },
          { name: 'url', type: 'url', title: 'Site web' }
        ]
      }]
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', title: 'Question' },
          { name: 'answer', type: 'text', title: 'Réponse' }
        ]
      }]
    }),
    defineField({ name: 'ctaTitle', title: 'Bouton CTA', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'Lien CTA', type: 'string' }),
  ],
  preview: { select: { title: 'heroTitle' } }
})