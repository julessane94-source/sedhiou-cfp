import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Fonction pour convertir une URL YouTube en format embed
function getYouTubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  // Si c'est déjà une URL embed, on la retourne
  if (url.includes('/embed/')) return url
  // Extraire l'ID de la vidéo
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  const match = url.match(regex)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return null
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
    console.log("Accueil data reçue:", data ? "OK" : "null")
    return data
  } catch (err) {
    console.error("Erreur Sanity:", err)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) {
    return <div className="pt-32 text-center text-stone-800">Aucune donnée d'accueil trouvée. Vérifiez Sanity Studio.</div>
  }

  const embedUrl = getYouTubeEmbedUrl(data.videoUrl)

  return (
    <div>
      {/* Hero section avec vidéo en arrière-plan */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-900 text-white overflow-hidden">
        {embedUrl && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src={embedUrl}
              className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Vidéo d'accueil"
            />
          </div>
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.heroTitle || 'CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="bg-white text-stone-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Découvrir nos formations →</Link>
        </div>
      </section>

      {/* Message du Directeur avec photo */}
      {data.directorMessage?.content && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden md:flex">
            {data.directorMessage.image && (
              <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img src={data.directorMessage.image} alt="Directeur" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8 md:w-2/3">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.directorMessage.title || 'Mot du Directeur'}</h2>
              <div className="prose prose-stone"><PortableText value={data.directorMessage.content} /></div>
              {data.directorMessage.signature && <p className="mt-4 italic text-stone-600">{data.directorMessage.signature}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Message du responsable CAI avec photo */}
      {data.caiMessage?.content && (
        <section className="container mx-auto px-4 py-16 bg-stone-50">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden md:flex flex-row-reverse">
            {data.caiMessage.image && (
              <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img src={data.caiMessage.image} alt="Responsable CAI" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8 md:w-2/3">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.caiMessage.title || 'Mot de la responsable CAI'}</h2>
              <div className="prose prose-stone"><PortableText value={data.caiMessage.content} /></div>
              {data.caiMessage.signature && <p className="mt-4 italic text-stone-600">{data.caiMessage.signature}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Événements en vedette */}
      {data.featuredEvents && data.featuredEvents.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Événements à venir</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.featuredEvents.map((event: any) => (
              <div key={event._id} className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                {event.coverImage && <img src={event.coverImage} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <p className="text-sm text-stone-500 mb-1">{new Date(event.publishedAt).toLocaleDateString()}</p>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{event.title}</h3>
                  <p className="text-stone-600 mb-4">{event.excerpt?.substring(0, 100)}...</p>
                  <Link href={`/actualites/${event.slug}`} className="text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formations en vedette */}
      {data.featuredFormations && data.featuredFormations.length > 0 && (
        <section className="bg-stone-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Formations en vedette</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredFormations.map((formation: any) => (
                <div key={formation._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
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
        </section>
      )}

      {/* Statistiques */}
      {data.stats && data.stats.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, idx: number) => (
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.bottomCta.text}</h2>
            <Link href={data.bottomCta.link || '/inscription'} className="bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block">
              Je m'inscris
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}