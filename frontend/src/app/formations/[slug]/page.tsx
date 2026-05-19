import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFormation(slug: string) {
  try {
    const query = `*[_type == "formation" && slug.current == $slug][0]{
      title,
      description,
      duration,
      price,
      startDate,
      "imageUrl": image.asset->url,
      content
    }`
    return await client.fetch(query, { slug })
  } catch (e) {
    return null
  }
}

export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const formation = await getFormation(params.slug)
  if (!formation) notFound()
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <Link href="/formations" className="text-green-700 hover:underline inline-block mb-4">&larr; Retour</Link>
        <div className="card-glass p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">{formation.title}</h1>
          {formation.imageUrl && <img src={formation.imageUrl} className="rounded-xl w-full mb-6" />}
          <p className="text-gray-700 mb-6">{formation.description}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div><strong>Durée :</strong> {formation.duration || '3 ans'}</div>
            <div><strong>Prix :</strong> {formation.price || 'Sur devis'}</div>
            <div><strong>Date de début :</strong> {formation.startDate ? new Date(formation.startDate).toLocaleDateString('fr-FR') : 'À venir'}</div>
          </div>
          {formation.content && <PortableText value={formation.content} />}
        </div>
      </div>
    </div>
  )
}