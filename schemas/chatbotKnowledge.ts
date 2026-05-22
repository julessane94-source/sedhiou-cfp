import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'chatbotKnowledge',
  title: 'Base de connaissances du chatbot (Tidiany)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question type',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Mots-clés (optionnels, séparés par des virgules)',
      type: 'string',
      description: 'Ex: inscription, coût, frais, tarif'
    }),
  ],
  preview: {
    select: { title: 'question' }
  }
})