import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  let videoId = ''
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      videoId = match[1]
      break
    }
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
    return await client.fetch(query)
  } catch (err) {
    console.error(err)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div className="pt-24 text-center">Chargement...</div>

  const embedUrl = getEmbedUrl(data.videoUrl)

  return (
    <div>
      {/* Vidéo en premier plan */}
      {embedUrl && (
        <div className="bg-black py-8">
          <div className="container mx-auto px-4">
            <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
              <iframe src={embedUrl} className="w-full h-full" frameBorder="0" allowFullScreen />
            </div>
          </div>
        </div>
      )}

      {/* Hero texte */}
      <section className="py-12 px-4 bg-[#d6bfbb] text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-3">{data.heroTitle || 'CFP SEDHIOU'}</h1>
        <p className="text-lg md:text-xl text-stone-700 mb-6">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
        <Link href="/formations" className="inline-block bg-[#772a1d] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#5c2016] transition">Découvrir nos formations →</Link>
      </section>

      {/* Messages avec photos */}
      <div className="py-12 px-4 bg-[#d6bfbb]">
        <div className="max-w-4xl mx-auto space-y-6">
          {data.directorMessage?.content && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-5">
              <div className="flex items-center gap-3 mb-3">
                {data.directorMessage.image && (
                  <img src={data.directorMessage.image} className="w-12 h-12 rounded-full object-cover border-2 border-[#772a1d]" />
                )}
                <h2 className="text-xl font-bold text-stone-800">{data.directorMessage.title || 'Mot du Directeur'}</h2>
              </div>
              <div className="prose prose-stone max-w-none"><PortableText value={data.directorMessage.content} /></div>
              {data.directorMessage.signature && <p className="mt-3 italic text-stone-600">{data.directorMessage.signature}</p>}
            </div>
          )}
          {data.caiMessage?.content && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-5">
              <div className="flex items-center gap-3 mb-3">
                {data.caiMessage.image && (
                  <img src={data.caiMessage.image} className="w-12 h-12 rounded-full object-cover border-2 border-[#772a1d]" />
                )}
                <h2 className="text-xl font-bold text-stone-800">{data.caiMessage.title || 'Mot de la responsable CAI'}</h2>
              </div>
              <div className="prose prose-stone max-w-none"><PortableText value={data.caiMessage.content} /></div>
              {data.caiMessage.signature && <p className="mt-3 italic text-stone-600">{data.caiMessage.signature}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Événements, formations, stats, CTA (conservés avec padding réduit) */}
      {data.featuredEvents && data.featuredEvents.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-8">Événements à venir</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.featuredEvents.map((event: any) => (
              <div key={event._id} className="bg-stone-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                {event.coverImage && <img src={event.coverImage} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <p className="text-sm text-stone-500">{new Date(event.publishedAt).toLocaleDateString()}</p>
                  <h3 className="text-lg font-bold text-stone-800">{event.title}</h3>
                  <p className="text-stone-600 line-clamp-2">{event.excerpt}</p>
                  <Link href={`/actualites/${event.slug}`} className="text-[#772a1d] font-semibold text-sm inline-block mt-2">En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.featuredFormations && data.featuredFormations.length > 0 && (
        <section className="py-12 px-4 bg-stone-100">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-8">Formations en vedette</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.featuredFormations.map((formation: any) => (
              <div key={formation._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                {formation.imageUrl && <img src={formation.imageUrl} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-stone-800">{formation.title}</h3>
                  <p className="text-stone-600 line-clamp-2">{formation.description}</p>
                  <Link href={`/formations/${formation.slug}`} className="text-[#772a1d] font-semibold text-sm inline-block mt-2">En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.stats && data.stats.length > 0 && (
        <div className="py-12 px-4 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {data.stats.map((stat: any, idx: number) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-[#772a1d]">{stat.value}</div>
                <div className="text-stone-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.bottomCta && (
        <div className="py-12 px-4 bg-[#772a1d] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.bottomCta.text}</h2>
          <Link href={data.bottomCta.link || '/inscription'} className="inline-block bg-white text-[#772a1d] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">Je m'inscris</Link>
        </div>
      )}
    </div>
  )
}