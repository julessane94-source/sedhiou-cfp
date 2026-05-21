import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Event {
  _id: string
  title: string
  coverImage?: string
  slug: string
}

interface FeaturedFormation {
  _id: string
  title: string
  slug: string
  description: string
  imageUrl?: string
}

interface Stat {
  value: string
  label: string
}

async function getAccueil() {
  try {
    const query = `*[_type == "accueil"][0]{
      heroTitle,
      heroSubtitle,
      heroImage,
      heroVideoUrl,
      directorMessageTitle,
      directorMessageText,
      directorMessageSignature,
      directorPhoto,
      caiMessageTitle,
      caiMessageText,
      caiMessageSignature,
      caiPhoto,
      featuredEvents[]->{
        _id,
        title,
        "coverImage": coverImage.asset->url,
        "slug": slug.current
      },
      featuredFormations[]->{
        _id,
        title,
        "slug": slug.current,
        description,
        "imageUrl": image.asset->url
      },
      stats,
      bottomCta
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement accueil:", error)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div className="pt-32 text-center">Chargement...</div>

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-[#772a1d] to-[#5c2016] text-white">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-30">
            <img src={data.heroImage} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">{data.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200">{data.heroSubtitle}</p>
          <Link href="/formations" className="inline-block bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Découvrir nos formations</Link>
        </div>
      </section>

      {/* Message du Directeur */}
      {data.directorMessageText && (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.directorMessageTitle || 'Mot du Directeur'}</h2>
              <div className="text-stone-700 whitespace-pre-line">{data.directorMessageText}</div>
              <p className="mt-4 text-stone-500 italic">{data.directorMessageSignature}</p>
            </div>
            {data.directorPhoto && (
              <div>
                <img src={data.directorPhoto} className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message du Responsable CAI */}
      {data.caiMessageText && (
        <div className="bg-stone-100 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {data.caiPhoto && (
                <div>
                  <img src={data.caiPhoto} className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg" />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.caiMessageTitle || 'Mot du Responsable CAI'}</h2>
                <div className="text-stone-700 whitespace-pre-line">{data.caiMessageText}</div>
                <p className="mt-4 text-stone-500 italic">{data.caiMessageSignature}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Événements épinglés */}
      {data.featuredEvents && data.featuredEvents.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">Actualités récentes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.featuredEvents.map((event: Event) => (
              <div key={event._id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                {event.coverImage && <img src={event.coverImage} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{event.title}</h3>
                  <Link href={`/actualites/${event.slug}`} className="text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formations en vedette */}
      {data.featuredFormations && data.featuredFormations.length > 0 && (
        <div className="bg-stone-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">Formations en vedette</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredFormations.map((formation: FeaturedFormation) => (
                <div key={formation._id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  {formation.imageUrl && <img src={formation.imageUrl} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{formation.title}</h3>
                    <p className="text-stone-600 mb-4">{formation.description?.substring(0, 100)}...</p>
                    <Link href={`/formations/${formation.slug}`} className="text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Statistiques */}
      {data.stats && data.stats.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.map((stat: Stat, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-[#772a1d]">{stat.value}</div>
                <div className="text-stone-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      {data.bottomCta && (
        <div className="bg-[#772a1d] py-16 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{data.bottomCta.text}</h2>
            <Link href={data.bottomCta.link} className="bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block">
              Je m'inscris
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}