import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'inscription',
  title: 'Inscription',
  type: 'document',
  fields: [
    defineField({ name: 'nom', title: 'Nom', type: 'string', validation: R => R.required() }),
    defineField({ name: 'prenom', title: 'Prénom', type: 'string', validation: R => R.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: R => R.required().email() }),
    defineField({ name: 'telephone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'niveau', title: 'Niveau demandé', type: 'string', options: { list: ['CAP', 'ATTESTE', 'BT'] } }),
    defineField({ name: 'filiere', title: 'Filière', type: 'string' }),
    defineField({ name: 'annee', title: 'Année', type: 'number', options: { list: [1,2,3] } }),
    defineField({ name: 'niveauEtudes', title: "Niveau d'études (pour CAP)", type: 'string' }),
    defineField({ name: 'dateInscription', title: 'Date d’inscription', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'status', title: 'Statut', type: 'string', options: { list: ['nouveau', 'contacté', 'accepté', 'refusé'] }, initialValue: 'nouveau' }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'prenom' },
    prepare(selection) { return { title: `${selection.title} ${selection.subtitle}` } }
  }
})
