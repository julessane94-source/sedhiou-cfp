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
    <div className="pt-32 pb-20 px-4 min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-4 animate-fade-up">Actualités</h1>
        <p className="text-center text-stone-600 mb-12 animate-fade-up delay-100">Toute l'actualité du centre</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actualites.map((act, idx) => (
            <div key={act._id} className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              {act.coverImage && (
                <div className="h-52 overflow-hidden">
                  <img src={act.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              )}
              <div className="p-6">
                <p className="text-sm text-stone-500 mb-1">{new Date(act.publishedAt).toLocaleDateString()}</p>
                <h2 className="text-xl font-bold text-stone-800 mb-2 line-clamp-2">{act.title}</h2>
                <p className="text-stone-600 mb-4 line-clamp-3">{act.excerpt}</p>
                <Link href={`/actualites/${act.slug}`} className="inline-flex items-center text-[#772a1d] font-semibold hover:underline group">
                  Lire la suite
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}