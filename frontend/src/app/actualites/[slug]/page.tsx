import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getActualite(slug: string) {
  try {
    const query = `*[_type == "actualite" && slug.current == $slug][0]{
      title,
      publishedAt,
      "coverImage": coverImage.asset->url,
      body
    }`
    return await client.fetch(query, { slug })
  } catch (e) {
    return null
  }
}

export default async function ActualiteDetailPage({ params }: { params: { slug: string } }) {
  const act = await getActualite(params.slug)
  if (!act) notFound()
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <Link href="/actualites" className="text-green-700 hover:underline inline-block mb-4">&larr; Retour</Link>
        <div className="card-glass p-8">
          <h1 className="text-4xl font-bold mb-2">{act.title}</h1>
          <p className="text-gray-500 mb-4">{new Date(act.publishedAt).toLocaleDateString('fr-FR')}</p>
          {act.coverImage && <img src={act.coverImage} className="rounded-xl w-full mb-6" />}
          {act.body && <PortableText value={act.body} />}
        </div>
      </div>
    </div>
  )
}