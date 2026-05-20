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
    console.error("Erreur chargement actualités:", error)
    return []
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  if (!actualites.length) return <div className="pt-32 text-center">Aucune actualité pour le moment.</div>
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-stone-100 to-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-12 animate-fade-in">Actualités</h1>
        <div className="space-y-8">
          {actualites.map((a: Actualite, i: number) => (
            <div key={a._id} className="card-light animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              {a.coverImage && <img src={a.coverImage} className="w-full h-64 object-cover rounded-lg mb-4" />}
              <h2 className="text-2xl font-bold text-stone-800 mb-2">{a.title}</h2>
              <p className="text-stone-500 text-sm mb-2">{new Date(a.publishedAt).toLocaleDateString()}</p>
              <p className="text-stone-700 mb-4">{a.excerpt}</p>
              <Link href={`/actualites/${a.slug}`} className="text-amber-700 font-semibold hover:underline">Lire la suite →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}