import { client } from '@/lib/sanity/client'
import Link from 'next/link'

interface Actualite {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  slug: string
  coverImage: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getActualites(): Promise<Actualite[]> {
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
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  if (!actualites.length) return <div className="pt-32 text-center">Aucune actualité</div>
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-bordeaux-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-bordeaux-800">Actualités</h1>
        <div className="space-y-8">
          {actualites.map((a) => (
            <div key={a._id} className="bg-white shadow p-6 rounded">
              {a.coverImage && <img src={a.coverImage} className="w-full h-48 object-cover rounded mb-4" />}
              <h2 className="text-2xl font-bold text-bordeaux-800">{a.title}</h2>
              <p className="text-gray-500 text-sm">{new Date(a.publishedAt).toLocaleDateString()}</p>
              <p className="text-gray-700">{a.excerpt}</p>
              <Link href={`/actualites/${a.slug}`} className="text-bordeaux-600 font-semibold hover:underline">Lire la suite →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}