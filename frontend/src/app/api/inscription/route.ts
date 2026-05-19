import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📝 Données reçues :', body)

    // Validation basique
    if (!body.nom || !body.prenom || !body.email || !body.filiere) {
      console.error('❌ Champs manquants')
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    // Création du document Sanity
    const doc = {
      _type: 'inscription',
      nom: body.nom,
      prenom: body.prenom,
      email: body.email,
      telephone: body.telephone || '',
      niveau: body.niveau,
      filiere: body.filiere,
      annee: body.annee,
      niveauEtudes: body.niveauEtudes || '',
      dateInscription: new Date().toISOString(),
      status: 'nouveau',
    }

    console.log('📤 Envoi à Sanity :', doc)
    const result = await sanityClient.create(doc)
    console.log('✅ Succès :', result._id)

    return NextResponse.json({ success: true, id: result._id }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Erreur API inscription :', error.message)
    console.error(error)
    return NextResponse.json(
      { error: 'Erreur lors de l’enregistrement : ' + error.message },
      { status: 500 }
    )
  }
}
