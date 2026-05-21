import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

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
      <div className="container mx-auto max-w-7xl">
        {/* Header avec animation */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-extrabold text-stone-800 mb-4 tracking-tight">
            Actualités
          </h1>
          <div className="w-24 h-1 bg-[#772a1d] mx-auto rounded-full mb-4"></div>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Restez informé des dernières nouvelles et événements du CFP SEDHIOU
          </p>
        </div>

        {/* Grille ultra moderne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actualites.map((act, idx) => (
            <div
              key={act._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Image avec effet zoom */}
              <div className="relative h-56 overflow-hidden">
                {act.coverImage ? (
                  <img
                    src={act.coverImage}
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-4xl">
                    📰
                  </div>
                )}
                {/* Badge date flottant */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-stone-800 shadow-md">
                  {new Date(act.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              {/* Contenu avec effet glass */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-stone-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(act.publishedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> Lecture 2 min</span>
                </div>
                <h2 className="text-xl font-bold text-stone-800 mb-3 line-clamp-2 group-hover:text-[#772a1d] transition-colors">
                  {act.title}
                </h2>
                <p className="text-stone-600 mb-5 line-clamp-3">
                  {act.excerpt || 'Cliquez pour lire la suite de cet article...'}
                </p>
                <Link
                  href={`/actualites/${act.slug}`}
                  className="inline-flex items-center text-[#772a1d] font-semibold group/link transition-all hover:gap-2"
                >
                  Lire la suite
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>

              {/* Effet de bordure au survol */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-[#772a1d]/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Section newsletter (optionnelle) */}
        <div className="mt-20 text-center animate-fade-up delay-300">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-stone-800 mb-2">Restez connecté</h3>
            <p className="text-stone-600 mb-6">Suivez nos actualités en temps réel</p>
            <Link href="/inscription" className="inline-block bg-[#772a1d] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#5c2016] transition shadow-md hover:shadow-lg">
              S'abonner à la newsletter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}