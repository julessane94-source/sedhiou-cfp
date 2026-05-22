import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import ImageCarousel from '@/components/ImageCarousel'
import ChatBotWrapper from '@/components/ChatBotWrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface FeaturedEvent {
  _id: string
  title: string
  excerpt: string
  slug: string
  coverImage?: string
  publishedAt: string
}

interface FeaturedFormation {
  _id: string
  title: string
  description: string
  slug: string
  imageUrl?: string
}

function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  let cleanUrl = url.replace(/^http:\/\//i, 'https://')
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ]
  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern)
    if (match) return `https://www.youtube.com/embed/${match[1]}`
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
      carouselImages[]{ "url": asset->url },
      directorMessage { title, content, "image": image.asset->url, signature },
      caiMessage { title, content, "image": image.asset->url, signature },
      featuredEvents[]->{ _id, title, excerpt, "slug": slug.current, "coverImage": coverImage.asset->url, publishedAt },
      featuredFormations[]->{ _id, title, description, "slug": slug.current, "imageUrl": image.asset->url },
      stats[]{ value, label },
      bottomCta { text, link }
    }`
    return await client.fetch(query)
  } catch (err) { return null }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div className="pt-24 text-center">Chargement...</div>

  // Debug logging
  console.log('🔍 PAGE DATA DEBUG:')
  console.log('- directorMessage:', data.directorMessage)
  console.log('- caiMessage:', data.caiMessage)
  console.log('- videoUrl:', data.videoUrl)
  console.log('- heroImage:', data.heroImage)
  console.log('- carouselImages count:', data.carouselImages?.length)

  // Rassembler toutes les images du site pour le diaporama
  const collected: string[] = []
  if (data.carouselImages) collected.push(...data.carouselImages.map((img: any) => img.url))
  if (data.heroImage) collected.push(data.heroImage)
  if (data.directorMessage?.image) collected.push(data.directorMessage.image)
  if (data.caiMessage?.image) collected.push(data.caiMessage.image)
  if (data.featuredFormations) collected.push(...(data.featuredFormations as any[]).map(f => f.imageUrl).filter(Boolean))
  if (data.featuredEvents) collected.push(...(data.featuredEvents as any[]).map(e => e.coverImage).filter(Boolean))
  // dédupliquer et garder les URLs valides
  const uniqueImages = Array.from(new Set(collected.filter(Boolean)))

  const carouselImages = uniqueImages
  const embedUrl = getEmbedUrl(data.videoUrl)

  // Afficher le diaporama en priorité, sauf si vidéo YouTube valide
  const showVideo = Boolean(embedUrl)
  const showCarousel = carouselImages.length > 0

  return (
    <div>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {showCarousel ? (
          <div className="absolute inset-0 z-0"><ImageCarousel images={carouselImages} /></div>
          ) : showVideo ? (
          <div className="absolute inset-0 w-full h-full z-0">
            <iframe src={embedUrl ?? undefined} className="w-full h-full object-cover" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900 z-0"></div>
        )}
        <div className="relative z-10 text-center px-4 text-white max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{data.heroTitle || 'CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="inline-block bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg">Découvrir nos formations →</Link>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center"><div className="w-1 h-2 bg-white rounded-full mt-2"></div></div>
        </div>
      </section>

      {/* Messages Directeur / CAI */}
      <div className="py-20 px-4 bg-[#d6bfbb]">
        <div className="max-w-5xl mx-auto space-y-12">
          {data.directorMessage?.content && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {data.directorMessage.image && <img src={data.directorMessage.image} alt="Directeur" className="w-32 h-32 rounded-full object-cover border-4 border-[#772a1d]" />}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-stone-800 mb-3">{data.directorMessage.title || 'Mot du Directeur'}</h2>
                  <details className="bg-white/0 p-0">
                    <summary className="cursor-pointer inline-block bg-[#772a1d] text-white px-4 py-2 rounded-md">Lire le message du Directeur</summary>
                    <div className="mt-4 text-stone-700">
                      <PortableText value={data.directorMessage.content} />
                      {data.directorMessage.signature && <p className="mt-4 italic text-stone-600">{data.directorMessage.signature}</p>}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          )}
          {data.caiMessage?.content && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {data.caiMessage.image && <img src={data.caiMessage.image} alt="Responsable CAI" className="w-32 h-32 rounded-full object-cover border-4 border-[#772a1d]" />}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-stone-800 mb-3">{data.caiMessage.title || 'Mot de la responsable CAI'}</h2>
                  <details className="bg-white/0 p-0">
                    <summary className="cursor-pointer inline-block bg-[#772a1d] text-white px-4 py-2 rounded-md">Lire le message de la Responsable CAI</summary>
                    <div className="mt-4 text-stone-700">
                      <PortableText value={data.caiMessage.content} />
                      {data.caiMessage.signature && <p className="mt-4 italic text-stone-600">{data.caiMessage.signature}</p>}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Événements */}
      {data.featuredEvents?.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-4">Actualités & Événements</h2>
            <p className="text-center text-stone-600 mb-12">Restez informés des dernières nouvelles du centre</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(data.featuredEvents as FeaturedEvent[]).map((event) => (
                <div key={event._id} className="bg-stone-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  {event.coverImage && <img src={event.coverImage} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    <p className="text-sm text-stone-500 mb-1">{new Date(event.publishedAt).toLocaleDateString()}</p>
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{event.title}</h3>
                    <p className="text-stone-600 line-clamp-3">{event.excerpt}</p>
                    <Link href={`/actualites/${event.slug}`} className="inline-block mt-3 text-[#772a1d] font-semibold hover:underline">Lire la suite →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formations vedette */}
      {data.featuredFormations?.length > 0 && (
        <section className="py-20 px-4 bg-stone-100">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-4">Formations en vedette</h2>
            <p className="text-center text-stone-600 mb-12">Découvrez nos parcours les plus demandés</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(data.featuredFormations as FeaturedFormation[]).map((formation) => (
                <div key={formation._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  {formation.imageUrl && <img src={formation.imageUrl} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{formation.title}</h3>
                    <p className="text-stone-600 line-clamp-3">{formation.description}</p>
                    <Link href={`/formations/${formation.slug}`} className="inline-block mt-3 text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistiques */}
      {data.stats?.length > 0 && (
        <div className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {data.stats.map((stat: { value: string; label: string }, idx: number) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-[#772a1d]">{stat.value}</div>
                <div className="text-stone-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {data.bottomCta && (
        <div className="py-20 px-4 bg-[#772a1d] text-white text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">{data.bottomCta.text}</h2>
            <Link href={data.bottomCta.link || '/inscription'} className="inline-block bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg">Je m'inscris</Link>
          </div>
        </div>
      )}

      {/* Chatbot Tidiany */}
      <ChatBotWrapper />
    </div>
  )
}