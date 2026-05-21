import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAccueil() {
  const query = `*[_type == "accueil"][0]{
    hero{title, subtitle, "bgImage": backgroundImage.asset->url, videoUrl, ctaText, ctaLink},
    directorMessage{title, content, "photoUrl": photo.asset->url, "signatureUrl": signature.asset->url},
    caiMessage{title, content, "photoUrl": photo.asset->url},
    featuredEvents[]->{_id, title, excerpt, publishedAt, "slug": slug.current, "coverImage": coverImage.asset->url},
    featuredFormations[]->{_id, title, description, "slug": slug.current, "imageUrl": image.asset->url},
    stats[]{value, label},
    bottomCta{text, link}
  }`
  return await client.fetch(query)
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div>Chargement...</div>

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {data.hero?.bgImage && (
          <div className="absolute inset-0 z-0">
            <img src={data.hero.bgImage} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">{data.hero?.title || 'CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200">{data.hero?.subtitle}</p>
          {data.hero?.ctaText && (
            <Link href={data.hero.ctaLink || '/formations'} className="btn-modern btn-primary inline-block animate-fade-in animation-delay-400">
              {data.hero.ctaText}
            </Link>
          )}
        </div>
      </section>

      {/* MESSAGE DU DIRECTEUR */}
      {data.directorMessage && (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">{data.directorMessage.title}</h2>
              <div className="prose prose-stone max-w-none">
                <PortableText value={data.directorMessage.content} />
              </div>
              {data.directorMessage.signatureUrl && (
                <img src={data.directorMessage.signatureUrl} className="h-16 mt-4" />
              )}
            </div>
            {data.directorMessage.photoUrl && (
              <div className="flex justify-center">
                <img src={data.directorMessage.photoUrl} className="rounded-full w-64 h-64 object-cover shadow-xl" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* MESSAGE CAI */}
      {data.caiMessage && (
        <div className="bg-white/50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {data.caiMessage.photoUrl && (
                <div className="flex justify-center order-2 md:order-1">
                  <img src={data.caiMessage.photoUrl} className="rounded-full w-64 h-64 object-cover shadow-xl" />
                </div>
              )}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-stone-800 mb-6">{data.caiMessage.title}</h2>
                <div className="prose prose-stone max-w-none">
                  <PortableText value={data.caiMessage.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ÉVÉNEMENTS ÉPINGLÉS */}
      {data.featuredEvents && data.featuredEvents.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">Actualités récentes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.featuredEvents.map((event) => (
              <div key={event._id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                {event.coverImage && <img src={event.coverImage} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <p className="text-sm text-stone-500 mb-2">{new Date(event.publishedAt).toLocaleDateString()}</p>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{event.title}</h3>
                  <p className="text-stone-600 mb-4">{event.excerpt?.substring(0, 100)}...</p>
                  <Link href={`/actualites/${event.slug}`} className="text-[#772a1d] font-semibold hover:underline">Lire la suite →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FORMATIONS EN VEDETTE */}
      {data.featuredFormations && data.featuredFormations.length > 0 && (
        <div className="bg-white/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">Formations phares</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredFormations.map((formation) => (
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

      {/* STATISTIQUES */}
      {data.stats && data.stats.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-[#772a1d]">{stat.value}</div>
                <div className="text-stone-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM CTA */}
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