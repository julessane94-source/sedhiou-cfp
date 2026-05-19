import { client } from '@/lib/sanity/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getActualites() {
  try {
    const query = `*[_type == "actualite"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "coverImage": coverImage.asset->url
    }`
    return await client.fetch(query)
  } catch (e) { return [] }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  return (
    <div className="pt-32 pb-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Actualités</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {actualites.map((a) => (
          <div key={a._id} className="bg-white shadow p-6 rounded">
            {a.coverImage && <img src={a.coverImage} className="w-full h-48 object-cover rounded mb-4" />}
            <h2 className="text-2xl font-bold">{a.title}</h2>
            <p className="text-gray-500 text-sm">{new Date(a.publishedAt).toLocaleDateString()}</p>
            <p>{a.excerpt}</p>
            <Link href={`/actualites/${a.slug}`} className="text-red-700 font-semibold">Lire la suite →</Link>
          </div>
        ))}
      </div>
    </div>
  )
}