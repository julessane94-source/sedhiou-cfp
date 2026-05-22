import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
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
      name: 'blocks',
      title: 'Blocs de contenu',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'textWithImage' },
        { type: 'videoBlock' },
        { type: 'audioBlock' },
        { type: 'gallery' },
        { type: 'cta' },
        { type: 'featuredFormations' },
        { type: 'featuredActualites' },
        { type: 'faqBlock' },
        { type: 'testimonials' }
      ],
    }),
  ],
  preview: { select: { title: 'title' } }
})

// Types de blocs personnalisés (à placer dans le même fichier ou dans des fichiers séparés)
// Nous les définissons ici par simplicité

// Bloc Hero
export const hero = defineType({
  name: 'hero',
  title: 'Hero (bannière principale)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Sous-titre', type: 'text', rows: 2 }),
    defineField({ name: 'buttonText', title: 'Texte du bouton', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Lien du bouton', type: 'string' }),
    defineField({ name: 'backgroundImage', title: 'Image de fond', type: 'image', options: { hotspot: true } }),
  ],
})

// Bloc Texte + Image
export const textWithImage = defineType({
  name: 'textWithImage',
  title: 'Texte avec image',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'text', title: 'Texte', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imagePosition', title: 'Position de l\'image', type: 'string', options: { list: ['left', 'right'] }, initialValue: 'right' }),
  ],
})

// Bloc Vidéo (YouTube, Vimeo, etc.)
export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Vidéo (intégration)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'url', title: 'URL de la vidéo (YouTube, Vimeo)', type: 'url' }),
    defineField({ name: 'caption', title: 'Légende', type: 'text', rows: 2 }),
    defineField({ name: 'autoplay', title: 'Lecture automatique ?', type: 'boolean', initialValue: false }),
  ],
})

// Bloc Audio
export const audioBlock = defineType({
  name: 'audioBlock',
  title: 'Audio (podcast, émission)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'audioFile', title: 'Fichier audio', type: 'file', options: { accept: 'audio/*' } }),
    defineField({ name: 'transcript', title: 'Transcription', type: 'text', rows: 4 }),
  ],
})

// Galerie d'images
export const gallery = defineType({
  name: 'gallery',
  title: 'Galerie d\'images',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
  ],
})

// Appel à l'action (CTA)
export const cta = defineType({
  name: 'cta',
  title: 'Appel à l\'action (CTA)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Sous-titre', type: 'text', rows: 2 }),
    defineField({ name: 'buttonText', title: 'Texte du bouton', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Lien', type: 'string' }),
    defineField({ name: 'backgroundColor', title: 'Couleur de fond', type: 'string', options: { list: ['brown', 'beige', 'white'] } }),
  ],
})

// Mise en avant de formations (automatique ou manuelle)
export const featuredFormations = defineType({
  name: 'featuredFormations',
  title: 'Mise en avant de formations',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Sous-titre', type: 'text', rows: 2 }),
    defineField({ name: 'formations', title: 'Sélectionner les formations', type: 'array', of: [{ type: 'reference', to: [{ type: 'formation' }] }] }),
    defineField({ name: 'maxItems', title: 'Nombre maximum (si vide, toutes)', type: 'number' }),
  ],
})

// Mise en avant d'actualités
export const featuredActualites = defineType({
  name: 'featuredActualites',
  title: 'Mise en avant d\'actualités',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Sous-titre', type: 'text', rows: 2 }),
    defineField({ name: 'maxItems', title: 'Nombre maximum', type: 'number', initialValue: 3 }),
  ],
})

// Bloc FAQ
export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ (questions fréquentes)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Réponse', type: 'array', of: [{ type: 'block' }] }),
          ],
        },
      ],
    }),
  ],
})

// Bloc Témoignages
export const testimonials = defineType({
  name: 'testimonials',
  title: 'Témoignages',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Témoignages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'author', title: 'Auteur', type: 'string' }),
            defineField({ name: 'role', title: 'Rôle', type: 'string' }),
            defineField({ name: 'quote', title: 'Citation', type: 'text' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
  ],
})
