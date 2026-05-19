import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'

async function getFormation(slug: string) {
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
}

export default async function FormationDetailPage({ params }: { params: { slug: string } }) {
  const formation = await getFormation(params.slug)
  if (!formation) notFound()
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <Link href="/formations" className="text-bordeaux-300 hover:underline inline-block mb-4">&larr; Retour</Link>
      <h1 className="text-4xl font-bold mt-4">{formation.title}</h1>
      {formation.imageUrl && <img src={formation.imageUrl} className="my-6 rounded-lg" />}
      <p>{formation.description}</p>
      <div className="mt-4"><PortableText value={formation.content} /></div>
    </div>
  )
}