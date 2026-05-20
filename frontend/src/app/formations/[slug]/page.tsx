import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

async function getFormation(slug: string) {
  // Normaliser le slug reçu (remplacer les tirets par des espaces? Non, on s'attend à ce que le slug dans Sanity soit normalisé)
  // On suppose que le slug dans Sanity n'a pas d'espaces, donc on décode l'URL et on utilise directement.
  const decodedSlug = decodeURIComponent(slug)
  const query = `*[_type == "formation" && slug.current == $decodedSlug][0]{
    title,
    description,
    duration,
    price,
    startDate,
    "imageUrl": image.asset->url,
    content
  }`
  return await client.fetch(query)
}

export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const formation = await getFormation(params.slug)
  if (!formation) notFound()
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/formations" className="text-white hover:underline">&larr; Retour</Link>
        <h1 className="text-4xl font-bold text-white mt-4">{formation.title}</h1>
        {formation.imageUrl && <img src={formation.imageUrl} className="rounded-lg my-6" />}
        <p className="text-gray-200">{formation.description}</p>
        <div className="mt-6"><PortableText value={formation.content} /></div>
      </div>
    </div>
  )
}