import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

async function getFormation(slug: string) {
  try {
    // Décoder le slug et remplacer les tirets par des espaces si nécessaire (car Sanity stocke avec des espaces)
    const decodedSlug = decodeURIComponent(slug).replace(/-/g, ' ')
    const query = `*[_type == "formation" && slug.current == $decodedSlug][0]{
      title,
      description,
      duration,
      price,
      startDate,
      "imageUrl": image.asset->url,
      content
    }`
    const formation = await client.fetch(query)
    return formation
  } catch (error) {
    console.error("Erreur lors de la récupération de la formation:", error)
    return null
  }
}

export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const formation = await getFormation(params.slug)
  if (!formation) notFound()
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/formations" className="text-white hover:underline">&larr; Retour aux formations</Link>
        <h1 className="text-4xl font-bold text-white mt-4">{formation.title}</h1>
        {formation.imageUrl && <img src={formation.imageUrl} className="rounded-lg my-6" alt={formation.title} />}
        <p className="text-gray-200">{formation.description}</p>
        <div className="mt-6 text-gray-200">
          {formation.content && <PortableText value={formation.content} />}
        </div>
      </div>
    </div>
  )
}