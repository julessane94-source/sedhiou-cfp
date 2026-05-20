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
  } catch (error) {
    console.error("Erreur chargement actualitÃ©s:", error)
    return []
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  if (!actualites.length) return <div className="pt-32 text-center text-gray-600">Aucune actualitÃ© pour le moment.</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">ActualitÃ©s</h1>
        <div className="space-y-8">
          {actualites.map((a) => (
            <div key={a._id} className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg">
              {a.coverImage && <img src={a.coverImage} className="w-full h-64 object-cover rounded-lg mb-4" />}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{a.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{new Date(a.publishedAt).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-4">{a.excerpt}</p>
              <Link href={`/actualites/${a.slug}`} className="text-gray-900 font-semibold hover:underline">Lire la suite â†’</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}