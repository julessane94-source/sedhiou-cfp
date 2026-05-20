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
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  if (!actualites.length) return <div className="pt-32 text-center">Aucune actualité</div>
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 animate-fade-in">Actualités</h1>
        <div className="space-y-8">
          {actualites.map((a, i) => (
            <div key={a._id} className="card-modern p-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              {a.coverImage && <img src={a.coverImage} className="w-full h-64 object-cover rounded-lg mb-4" />}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{a.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{new Date(a.publishedAt).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-4">{a.excerpt}</p>
              <Link href={`/actualites/${a.slug}`} className="inline-block bg-gray-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-700 transition">Lire la suite →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}