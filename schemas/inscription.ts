import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'inscription',
  title: 'Inscription',
  type: 'document',
  fields: [
    defineField({ name: 'nom', title: 'Nom', type: 'string' }),
    defineField({ name: 'prenom', title: 'Prénom', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'telephone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'niveau', title: 'Niveau', type: 'string' }),
    defineField({ name: 'filiere', title: 'Filière', type: 'string' }),
    defineField({ name: 'annee', title: 'Année', type: 'number' }),
    defineField({ name: 'niveauEtudes', title: 'Niveau études', type: 'string' }),
    defineField({ name: 'dateInscription', title: 'Date', type: 'datetime' }),
    defineField({ name: 'status', title: 'Statut', type: 'string', options: { list: ['nouveau', 'contacté', 'accepté', 'refusé'] }, initialValue: 'nouveau' }),
  ],
})
