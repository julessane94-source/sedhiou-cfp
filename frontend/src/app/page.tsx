import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  let videoId = ''
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1])
    videoId = urlParams.get('v') || ''
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
  } else if (url.includes('youtube.com/embed/')) {
    return url
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

async function getAccueil() {
  try {
    const query = `*[_type == "accueil"][0]{
      heroTitle,
      heroSubtitle,
      videoUrl,
      heroImage,
      directorMessage {
        title,
        content,
        "image": image.asset->url,
        signature
      },
      caiMessage {
        title,
        content,
        "image": image.asset->url,
        signature
      },
      featuredEvents[]->{
        _id,
        title,
        excerpt,
        "slug": slug.current,
        "coverImage": coverImage.asset->url,
        publishedAt
      },
      featuredFormations[]->{
        _id,
        title,
        description,
        "slug": slug.current,
        "imageUrl": image.asset->url
      },
      stats[]{
        value,
        label
      },
      bottomCta {
        text,
        link
      }
    }`
    const data = await client.fetch(query)
    console.log('[HOME] Données reçues :', data)
    return data
  } catch (err) {
    console.error('[HOME] Erreur Sanity :', err)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) {
    return <div className="pt-32 text-center">Chargement...</div>
  }

  const embedUrl = getEmbedUrl(data.videoUrl)

  return (
    <div className="overflow-x-hidden">
      {/* Hero section avec vidéo de fond ou image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {embedUrl ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={embedUrl}
              className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : data.heroImage ? (
          <div className="absolute inset-0">
            <img src={data.heroImage} className="w-full h-full object-cover opacity-30" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900"></div>
        )}
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-up">{data.heroTitle || 'CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-up delay-100">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="inline-block bg-white text-stone-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg animate-fade-up delay-200">Découvrir nos formations →</Link>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center"><div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll"></div></div>
        </div>
      </section>

      {/* Message du Directeur */}
      {data.directorMessage?.content && (
        <section className="py-20 px-4 bg-gradient-to-r from-white to-stone-50">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {data.directorMessage.image && (
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <img src={data.directorMessage.image} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.directorMessage.title || 'Mot du Directeur'}</h2>
                <div className="prose prose-stone max-w-none"><PortableText value={data.directorMessage.content} /></div>
                {data.directorMessage.signature && <p className="mt-4 text-stone-600 italic">{data.directorMessage.signature}</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Message du responsable CAI */}
      {data.caiMessage?.content && (
        <section className="py-20 px-4 bg-stone-100">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
              {data.caiMessage.image && (
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <img src={data.caiMessage.image} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.caiMessage.title || 'Mot de la responsable CAI'}</h2>
                <div className="prose prose-stone max-w-none"><PortableText value={data.caiMessage.content} /></div>
                {data.caiMessage.signature && <p className="mt-4 text-stone-600 italic">{data.caiMessage.signature}</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Événements vedettes */}
      {data.featuredEvents && data.featuredEvents.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-stone-800 mb-12">Événements à venir</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredEvents.map((event) => (
                <div key={event._id} className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  {event.coverImage && <div className="h-56 overflow-hidden"><img src={event.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>}
                  <div className="p-6">
                    <p className="text-sm text-stone-500 mb-1">{new Date(event.publishedAt).toLocaleDateString()}</p>
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{event.title}</h3>
                    <p className="text-stone-600 mb-4 line-clamp-3">{event.excerpt}</p>
                    <Link href={`/actualites/${event.slug}`} className="inline-flex items-center text-[#772a1d] font-semibold hover:underline group">En savoir plus <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formations vedettes */}
      {data.featuredFormations && data.featuredFormations.length > 0 && (
        <section className="py-20 px-4 bg-stone-100">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-stone-800 mb-12">Formations en vedette</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredFormations.map((formation) => (
                <div key={formation._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  {formation.imageUrl && <div className="h-56 overflow-hidden"><img src={formation.imageUrl} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" /></div>}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{formation.title}</h3>
                    <p className="text-stone-600 mb-4 line-clamp-3">{formation.description}</p>
                    <Link href={`/formations/${formation.slug}`} className="inline-flex items-center text-[#772a1d] font-semibold hover:underline">En savoir plus <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistiques */}
      {data.stats && data.stats.length > 0 && (
        <div className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold text-[#772a1d]">{stat.value}</div>
                  <div className="text-stone-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action final */}
      {data.bottomCta && (
        <div className="py-20 px-4 bg-[#772a1d] text-white text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.bottomCta.text}</h2>
            <Link href={data.bottomCta.link || '/inscription'} className="inline-block bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg">Je m'inscris</Link>
          </div>
        </div>
      )}
    </div>
  )
}