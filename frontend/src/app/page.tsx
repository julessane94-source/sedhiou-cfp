import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getEmbedUrl(url) {
  if (!url) return null
  let videoId = ''
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/, /youtube\.com\/embed\/([^&\n?#]+)/]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) { videoId = match[1]; break }
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

async function getAccueil() {
  try {
    const query = `*[_type == "accueil"][0]{
      heroTitle, heroSubtitle, videoUrl, heroImage,
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
  const embedUrl = getEmbedUrl(data.videoUrl)

  return (
    <div className="bg-[#d6bfbb]">
      {/* Hero compact */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-stone-800 to-stone-900 text-white">
        {embedUrl ? (
          <div className="absolute inset-0 opacity-20"><iframe src={embedUrl} className="w-full h-full object-cover" frameBorder="0" allowFullScreen /></div>
        ) : null}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{data.heroTitle || 'CFP SEDHIOU'}</h1>
          <p className="text-lg md:text-xl mb-4">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="inline-block bg-white text-stone-800 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">DÃ©couvrir â†’</Link>
        </div>
      </section>

      {/* Messages avec photos (accordÃ©on compact) */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {data.directorMessage?.content && (
          <details className="bg-white rounded-xl shadow-sm p-4 group">
            <summary className="flex items-center gap-3 cursor-pointer list-none font-bold text-stone-800">
              {data.directorMessage.image && <img src={data.directorMessage.image} className="w-10 h-10 rounded-full object-cover" />}
              <span>{data.directorMessage.title || 'Mot du Directeur'}</span>
              <span className="ml-auto text-[#772a1d]">â–¼</span>
            </summary>
            <div className="mt-3 pl-0 md:pl-14"><PortableText value={data.directorMessage.content} /></div>
            {data.directorMessage.signature && <p className="mt-2 text-sm italic text-stone-500">{data.directorMessage.signature}</p>}
          </details>
        )}
        {data.caiMessage?.content && (
          <details className="bg-white rounded-xl shadow-sm p-4 group">
            <summary className="flex items-center gap-3 cursor-pointer list-none font-bold text-stone-800">
              {data.caiMessage.image && <img src={data.caiMessage.image} className="w-10 h-10 rounded-full object-cover" />}
              <span>{data.caiMessage.title || 'Mot de la responsable CAI'}</span>
              <span className="ml-auto text-[#772a1d]">â–¼</span>
            </summary>
            <div className="mt-3 pl-0 md:pl-14"><PortableText value={data.caiMessage.content} /></div>
            {data.caiMessage.signature && <p className="mt-2 text-sm italic text-stone-500">{data.caiMessage.signature}</p>}
          </details>
        )}
      </div>

      {/* Ã‰vÃ©nements en vedette (grid compacte) */}
      {data.featuredEvents?.length > 0 && (
        <div className="py-8 px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Ã‰vÃ©nements Ã  venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {data.featuredEvents.map(event => (
              <div key={event._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow transition">
                {event.coverImage && <img src={event.coverImage} className="h-36 w-full object-cover" />}
                <div className="p-3">
                  <p className="text-xs text-stone-500">{new Date(event.publishedAt).toLocaleDateString()}</p>
                  <h3 className="font-bold text-md">{event.title}</h3>
                  <p className="text-sm text-stone-600 line-clamp-2">{event.excerpt}</p>
                  <Link href={`/actualites/${event.slug}`} className="text-[#772a1d] text-sm font-semibold">Lire â†’</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistiques compactes */}
      {data.stats?.length > 0 && (
        <div className="py-8 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {data.stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-[#772a1d]">{s.value}</div>
                <div className="text-xs text-stone-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA compact */}
      {data.bottomCta && (
        <div className="py-8 px-4 bg-[#772a1d] text-white text-center">
          <h2 className="text-xl font-bold mb-2">{data.bottomCta.text}</h2>
          <Link href={data.bottomCta.link || '/inscription'} className="inline-block bg-white text-[#772a1d] px-5 py-2 rounded-full text-sm font-semibold">Je m'inscris</Link>
        </div>
      )}
    </div>
  )
}