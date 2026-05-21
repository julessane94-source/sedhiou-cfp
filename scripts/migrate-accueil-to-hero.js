#!/usr/bin/env node
/*
Script de migration Sanity: transforme les champs legacy (heroTitle, heroSubtitle, heroImage, videoUrl, bottomCta)
vers l'objet `hero` dans les documents de type `accueil`.

Usage:
  # dry run (affiche les changements sans les appliquer)
  node scripts/migrate-accueil-to-hero.js

  # appliquer les changements (nécessite SANITY_API_TOKEN avec droits write)
  SANITY_API_TOKEN=sk... node scripts/migrate-accueil-to-hero.js --apply

Note: installez la dépendance locale avant d'exécuter:
  npm install @sanity/client

*/

const argv = process.argv.slice(2)
const apply = argv.includes('--apply')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECTID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  console.error('Erreur: définissez NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET dans les vars d\'environnement')
  process.exit(1)
}

if (apply && !token) {
  console.error('Erreur: pour appliquer les patches, définissez SANITY_API_TOKEN avec droits d\'écriture')
  process.exit(1)
}

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: token || undefined,
})

;(async () => {
  try {
    const docs = await client.fetch('*[_type == "accueil"]{_id, _rev, heroTitle, heroSubtitle, heroImage, videoUrl, bottomCta, contentBlocks, directorMessage, caiMessage}')
    if (!docs || docs.length === 0) {
      console.log('Aucun document de type `accueil` trouvé.')
      return
    }

    console.log(`Trouvé ${docs.length} document(s) 'accueil'.`)

    for (const doc of docs) {
      const hero = {
        title: doc.heroTitle || undefined,
        subtitle: doc.heroSubtitle || undefined,
        backgroundImage: doc.heroImage || undefined,
        videoUrl: doc.videoUrl || undefined,
        ctaText: doc.bottomCta?.text || undefined,
        ctaLink: doc.bottomCta?.link || undefined,
      }
      Object.keys(hero).forEach(k => hero[k] === undefined && delete hero[k])

      console.log('---')
      console.log('Document:', doc._id)
      console.log('Hero (nouveau):', JSON.stringify(hero, null, 2))

      if (apply) {
        // compose patch: set hero, then unset legacy fields
        const patch = client.patch(doc._id).set({ hero })
        // unset legacy flat fields if present
        patch.unset(['heroTitle', 'heroSubtitle', 'heroImage', 'videoUrl', 'bottomCta'])
        try {
          const res = await patch.commit({ ifRevisionID: doc._rev })
          console.log('Patch appliqué:', res._id)
        } catch (err) {
          console.error('Échec du patch pour', doc._id, err.message || err)
        }
      }
    }

    if (!apply) {
      console.log('\nDry-run terminé. Pour appliquer les changements, relancez en fournissant `SANITY_API_TOKEN` et l\'option `--apply`.')
    } else {
      console.log('\nMigration terminée (apply).')
    }
  } catch (err) {
    console.error('Erreur:', err)
    process.exit(1)
  }
})()
