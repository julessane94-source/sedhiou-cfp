import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'accueil',
  title: 'Accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Section Héro',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'subtitle', type: 'text', title: 'Sous-titre', rows: 2 },
        { name: 'backgroundImage', type: 'image', title: 'Image de fond', options: { hotspot: true } },
        { name: 'carouselImages', type: 'array', title: 'Images du diaporama', of: [{ type: 'image', options: { hotspot: true } }], description: 'Ajoutez ici plusieurs images pour le diaporama du hero.' },
        { name: 'videoUrl', type: 'url', title: 'URL vidéo (YouTube embed)' },
        { name: 'ctaText', type: 'string', title: 'Texte du bouton' },
        { name: 'ctaLink', type: 'string', title: 'Lien du bouton' }
      ]
    }),
    defineField({
      name: 'directorMessage',
      title: 'Message du Directeur',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Titre', initialValue: 'Mot du Directeur' },
        { name: 'content', type: 'array', title: 'Contenu', of: [{ type: 'block' }] },
        { name: 'photo', type: 'image', title: 'Photo du directeur', options: { hotspot: true } },
        { name: 'signature', type: 'image', title: 'Signature' }
      ]
    }),
    defineField({
      name: 'caiMessage',
      title: 'Message du responsable CAI',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Titre', initialValue: 'Message du responsable CAI' },
        { name: 'content', type: 'array', of: [{ type: 'block' }] },
        { name: 'photo', type: 'image', title: 'Photo', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'featuredEvents',
      title: 'Événements épinglés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'actualite' }] }],
      description: 'Sélectionnez les actualités à afficher sur la page d’accueil'
    }),
    defineField({
      name: 'featuredFormations',
      title: 'Formations en vedette',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'formation' }] }],
      description: 'Sélectionnez les formations à mettre en avant'
    }),
    defineField({
      name: 'stats',
      title: 'Chiffres clés',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }] }]
    }),
    defineField({
      name: 'bottomCta',
      title: 'Appel à l’action final',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Texte' },
        { name: 'link', type: 'string', title: 'Lien' }
      ]
    })
  ],
  preview: { select: { title: 'hero.title' } }
})