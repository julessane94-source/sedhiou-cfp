import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'inscriptionPage',
  title: 'Page Inscription',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre de la page', type: 'string' }),
    defineField({ name: 'hero', title: 'Héros', type: 'object', fields: [
      defineField({ name: 'title', title: 'Titre', type: 'string' }),
      defineField({ name: 'subtitle', title: 'Sous-titre', type: 'text' }),
      defineField({ name: 'image', title: 'Image', type: 'image' }),
    ]}),
    defineField({ name: 'instructions', title: 'Instructions pour les candidats', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'formFields',
      title: 'Champs du formulaire (affichage)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nom du champ', type: 'string' }),
            defineField({ name: 'type', title: 'Type', type: 'string', options: { list: ['text','email','tel','select','textarea','date'] } }),
            defineField({ name: 'required', title: 'Obligatoire', type: 'boolean' }),
            defineField({ name: 'options', title: 'Options (pour select)', type: 'array', of: [{ type: 'string' }], hidden: false }),
          ],
        },
      ],
    }),
    defineField({ name: 'privacyText', title: 'Texte RGPD / confidentialité', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'ctaText', title: 'Texte du bouton', type: 'string' }),
    defineField({ name: 'successMessage', title: 'Message après envoi', type: 'text' }),
  ],
})
