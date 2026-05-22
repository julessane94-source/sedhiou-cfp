import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

function normalizeVideoUrl(url?: string) {
  if (!url) return undefined
  try {
    const m = url.match(/(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
    const id = m ? m[1] : null
    if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=0&mute=1&playsinline=1`
    return url
  } catch (e) {
    return url
  }
}

interface Actualite {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  slug: string
  coverImage: string
  videoUrl?: string
  gallery?: string[]
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
      "coverImage": coverImage.asset->url,
      videoUrl,
      "gallery": gallery[].asset->url
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement actualitÃƒÂ©s:", error)
    return []
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  if (!actualites.length) return <div className="pt-24 text-center">Aucune actualitÃƒÂ© pour le moment.</div>
  return (
    <div className="pt-24 pb-12 px-4 " style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-4 animate-fade-up">ActualitÃƒÂ©s</h1>
        <p className="text-center text-stone-600 mb-12 animate-fade-up delay-100">Toute l'actualitÃƒÂ© du centre</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actualites.map((act, idx) => (
            <article key={act._id} className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-up" style={{ animationDelay: `${idx * 0.06}s` }}>
              <div className="relative">
                {act.coverImage && (
                  <div className="h-56 overflow-hidden bg-gray-100">
                    <img src={act.coverImage} alt={act.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                {act.videoUrl && (
                  <div className="aspect-video">
                    <iframe src={normalizeVideoUrl(act.videoUrl)} className="w-full h-full" frameBorder="0" allowFullScreen title={`video-${act._id}`} />
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-sm text-stone-500 mb-1">{new Date(act.publishedAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <h2 className="text-xl font-bold text-stone-800 mb-2 line-clamp-2">{act.title}</h2>
                <p className="text-stone-600 mb-4 line-clamp-3">{act.excerpt}</p>
                <div className="flex items-center justify-between gap-4">
                  <Link href={`/actualites/${act.slug}`} className="inline-flex items-center gap-2 bg-[#772a1d] text-white px-4 py-2 rounded-full font-semibold shadow-sm hover:opacity-95">
                    Lire la suite
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  {act.gallery?.length ? <span className="text-sm text-stone-500">📷 {act.gallery.length} images</span> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}