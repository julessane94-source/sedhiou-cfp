import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

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
      <div className="container mx-auto max-w-6xl">
        {/* En-tête avec animation */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-800 mb-4 relative inline-block">
            Actualités
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#772a1d] rounded-full"></span>
          </h1>
          <p className="text-stone-600 mt-6 text-lg">Suivez l'actualité du CFP SEDHIOU</p>
        </div>

        {/* Grille d'actualités avec animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actualites.map((act, index) => (
            <div
              key={act._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image avec zoom au hover */}
              <div className="relative h-56 overflow-hidden">
                {act.coverImage ? (
                  <img
                    src={act.coverImage}
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#772a1d]/20 to-[#772a1d]/40 flex items-center justify-center">
                    <span className="text-6xl">📰</span>
                  </div>
                )}
                {/* Badge date */}
                <div className="absolute top-4 left-4 bg-[#772a1d] text-white text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(act.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-stone-800 mb-3 line-clamp-2 group-hover:text-[#772a1d] transition-colors">
                  {act.title}
                </h2>
                <p className="text-stone-600 mb-4 line-clamp-3">{act.excerpt}</p>
                <Link
                  href={`/actualites/${act.slug}`}
                  className="inline-flex items-center gap-2 text-[#772a1d] font-semibold hover:gap-3 transition-all duration-300"
                >
                  Lire la suite <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucune actualité */}
        {actualites.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">Aucune actualité pour le moment. Revenez bientôt !</p>
          </div>
        )}
      </div>
    </div>
  )
}