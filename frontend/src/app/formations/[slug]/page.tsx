import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
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
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const formation = await getFormation(params.slug)
  if (!formation) notFound()
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-4xl">
        <Link href="/formations" className="text-gray-600 hover:text-gray-900 inline-block mb-4">&larr; Retour aux formations</Link>
        <div className="card-modern p-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-4">{formation.title}</h1>
          {formation.imageUrl && <img src={formation.imageUrl} className="rounded-lg my-6 w-full" />}
          <p className="text-gray-600 mb-6">{formation.description}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-3 rounded-lg"><span className="font-semibold">Durée:</span> {formation.duration || '3 ans'}</div>
            <div className="bg-gray-100 p-3 rounded-lg"><span className="font-semibold">Prix:</span> {formation.price || 'Sur devis'}</div>
            <div className="bg-gray-100 p-3 rounded-lg"><span className="font-semibold">Date de début:</span> {formation.startDate ? new Date(formation.startDate).toLocaleDateString() : 'À venir'}</div>
          </div>
          <div className="prose prose-gray max-w-none">
            {formation.content && <PortableText value={formation.content} />}
          </div>
        </div>
      </div>
    </div>
  )
}