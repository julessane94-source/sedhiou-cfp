import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'

async function getActualite(slug: string) {
  try {
    const query = `*[_type == "actualite" && slug.current == $slug][0]{
      title,
      publishedAt,
      "coverImage": coverImage.asset->url,
      body
    }`
    return await client.fetch(query, { slug })
  } catch (error) {
    return null
  }
}

export default async function ActualiteDetailPage({ params }: { params: { slug: string } }) {
  const act = await getActualite(params.slug)
  if (!act) notFound()
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <Link href="/actualites" className="text-white hover:underline">&larr; Retour</Link>
      <h1 className="text-4xl font-bold text-white mt-4">{act.title}</h1>
      <p className="text-gray-300">{new Date(act.publishedAt).toLocaleDateString()}</p>
      {act.coverImage && <img src={act.coverImage} className="rounded-lg my-6" />}
      <PortableText value={act.body} />
    </div>
  )
}