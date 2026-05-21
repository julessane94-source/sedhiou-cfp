import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAccueil() {
  const query = `*[_type == "accueil"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    videoUrl,
    directorMessageTitle,
    directorMessageText,
    directorMessageSignature,
    directorPhoto,
    caiMessageTitle,
    caiMessageText,
    caiMessageSignature,
    caiPhoto,
    featuredEvents[]->{_id, title, excerpt, "slug": slug.current, publishedAt, "coverImage": coverImage.asset->url},
    featuredFormations[]->{_id, title, description, "slug": slug.current, duration, price, "imageUrl": image.asset->url},
    stats,
    bottomCta
  }`
  return await client.fetch(query)
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div className="pt-32 text-center">Chargement...</div>

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-900 text-white">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-30">
            <img src={data.heroImage} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8">{data.heroSubtitle}</p>
          <Link href="/formations" className="bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Découvrir nos formations</Link>
        </div>
      </section>

      {/* MESSAGE DU DIRECTEUR */}
      {data.directorMessageText && (
        <section className="py-16 px-4 container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {data.directorPhoto && (
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img src={data.directorPhoto} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.directorMessageTitle || 'Mot du Directeur'}</h2>
              <p className="text-stone-700 whitespace-pre-line">{data.directorMessageText}</p>
              {data.directorMessageSignature && (
                <p className="mt-4 text-stone-600 italic">— {data.directorMessageSignature}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* MESSAGE DU RESPONSABLE CAI */}
      {data.caiMessageText && (
        <section className="py-16 px-4 bg-white/50">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              {data.caiPhoto && (
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                  <img src={data.caiPhoto} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.caiMessageTitle || 'Mot du responsable CAI'}</h2>
                <p className="text-stone-700 whitespace-pre-line">{data.caiMessageText}</p>
                {data.caiMessageSignature && (
                  <p className="mt-4 text-stone-600 italic">— {data.caiMessageSignature}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ÉVÉNEMENTS ÉPINGLÉS */}
      {data.featuredEvents && data.featuredEvents.length > 0 && (
        <section className="py-16 px-4 container mx-auto">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Événements à venir / Actualités récentes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.featuredEvents.map((event) => (
              <div key={event._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {event.coverImage && <img src={event.coverImage} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{event.title}</h3>
                  <p className="text-stone-600 text-sm mb-2">{new Date(event.publishedAt).toLocaleDateString()}</p>
                  <p className="text-stone-600 mb-4">{event.excerpt}</p>
                  <Link href={`/actualites/${event.slug}`} className="text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FORMATIONS EN VEDETTE */}
      {data.featuredFormations && data.featuredFormations.length > 0 && (
        <section className="py-16 px-4 bg-white/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Formations populaires</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.featuredFormations.map((formation) => (
                <div key={formation._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  {formation.imageUrl && <img src={formation.imageUrl} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{formation.title}</h3>
                    <p className="text-stone-600 text-sm mb-4">{formation.duration} • {formation.price}</p>
                    <p className="text-stone-600 mb-4">{formation.description?.substring(0, 80)}...</p>
                    <Link href={`/formations/${formation.slug}`} className="text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STATISTIQUES */}
      {data.stats && data.stats.length > 0 && (
        <section className="py-16 px-4 container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-[#772a1d]">{stat.value}</div>
                <div className="text-stone-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      {data.bottomCta && (
        <section className="bg-[#772a1d] py-16 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{data.bottomCta.text}</h2>
            <Link href={data.bottomCta.link} className="bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block">
              Je m'inscris
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}