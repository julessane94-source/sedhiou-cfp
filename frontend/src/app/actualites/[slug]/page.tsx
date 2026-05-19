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
    console.error(e)
    return null
  }
}

export default async function ActualiteDetailPage({ params }: { params: { slug: string } }) {
  const actualite = await getActualite(params.slug)
  if (!actualite) notFound()
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <Link href="/actualites" className="text-green-700 underline mb-4 inline-block">&larr; Retour</Link>
        <div className="card-glass p-8">
          <h1 className="text-4xl font-bold mb-2">{actualite.title}</h1>
          <p className="text-gray-500 mb-4">{new Date(actualite.publishedAt).toLocaleDateString('fr-FR')}</p>
          {actualite.coverImage && <img src={actualite.coverImage} className="rounded-xl mb-6 w-full" />}
          {actualite.body && <PortableText value={actualite.body} />}
        </div>
      </div>
    </div>
  )
}