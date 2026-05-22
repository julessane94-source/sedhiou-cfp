#!/usr/bin/env node
/*
Publish Sanity drafts to the published dataset.

Usage:
  # dry-run (no write):
  node scripts/publish-sanity-drafts.js

  # publish drafts (requires SANITY_API_TOKEN with write rights):
  SANITY_API_TOKEN=sk... node scripts/publish-sanity-drafts.js --apply

Optional:
  --type=accueil   # only publish drafts of a given _type
*/

const argv = process.argv.slice(2)
const apply = argv.includes('--apply')
const typeArg = argv.find(a => a.startsWith('--type=')) ?.split('=')[1]

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  console.error('Erreur: définissez NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}

if (apply && !token) {
  console.error('Erreur: pour appliquer les publications, définissez SANITY_API_TOKEN avec droits d\'écriture')
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
    let query = '*[_id match "drafts.*"]{...}'
    if (typeArg) query = `*[_id match "drafts.*" && _type == "${typeArg}"]{...}`

    const drafts = await client.fetch(query)
    console.log(`Trouvé ${drafts.length} brouillon(s)${typeArg ? ' de type ' + typeArg : ''}.`)
    if (!drafts || drafts.length === 0) return

    for (const d of drafts) {
      const publishedId = d._id.replace(/^drafts\./, '')
      const doc = { ...d, _id: publishedId }
      // remove system fields (starting with _)
      for (const k of Object.keys(doc)) if (k.startsWith('_')) delete doc[k]

      console.log('---')
      console.log('Brouillon:', d._id)
      console.log('Publier en tant que:', publishedId)

      if (apply) {
        try {
          const res = await client.createOrReplace(doc)
          console.log('Publié:', res._id)
        } catch (err) {
          console.error('Échec de la publication pour', publishedId, err.message || err)
        }
      }
    }

    if (!apply) console.log('\nDry-run terminé. Relancez avec --apply et SANITY_API_TOKEN pour publier.')
    else console.log('\nPublication terminée.')
  } catch (err) {
    console.error('Erreur:', err)
    process.exit(1)
  }
})()
