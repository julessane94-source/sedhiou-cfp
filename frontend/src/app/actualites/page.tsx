import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

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
        <p className="text-center text-stone-600 mb-12 animate-fade-up delay-200">Suivez l'actualité de notre centre</p>
        <div className="space-y-10">
          {actualites.map((act, idx) => (
            <div key={act._id} className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 animate-fade-left" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="md:flex">
                {act.coverImage && (
                  <div className="md:w-2/5 h-64 overflow-hidden">
                    <img src={act.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-8 md:w-3/5">
                  <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(act.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> Lecture 2 min</span>
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 mb-3">{act.title}</h2>
                  <p className="text-stone-600 mb-4">{act.excerpt}</p>
                  <Link href={`/actualites/${act.slug}`} className="inline-flex items-center text-[#772a1d] font-semibold hover:underline group">
                    Lire la suite
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}