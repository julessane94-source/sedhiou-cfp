import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Titre du site', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'facebookUrl', title: 'Facebook', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn', type: 'url' }),
    defineField({ name: 'twitterUrl', title: 'X (Twitter)', type: 'url' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'Email contact', type: 'string' }),
    defineField({ name: 'defaultSeo', title: 'SEO par défaut', type: 'object', fields: [
      defineField({ name: 'metaTitle', title: 'Meta title', type: 'string' }),
      defineField({ name: 'metaDescription', title: 'Meta description', type: 'text' }),
      defineField({ name: 'ogImage', title: 'Image Open Graph', type: 'image' }),
    ] }),
    defineField({ name: 'homepage', title: 'Page d\'accueil par défaut', type: 'reference', to: [{ type: 'accueil' }, { type: 'homePage' }] }),
  ],
})
