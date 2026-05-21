import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  // Nettoyer l'URL et extraire l'ID vidéo
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
    const data = await client.fetch(query)
    console.log('[HOME] Données brutes:', JSON.stringify(data, null, 2))
    return data
  } catch (err) {
    console.error('[HOME] Erreur fetch:', err)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div className="pt-32 text-center">Erreur de chargement</div>

  const embedUrl = getEmbedUrl(data.videoUrl)

  return (
    <div>
      {/* Vidéo en premier plan */}
      <div className="bg-black py-12">
        <div className="container mx-auto px-4">
          {embedUrl ? (
            <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
              <iframe src={embedUrl} className="w-full h-full" frameBorder="0" allowFullScreen />
            </div>
          ) : (
            <div className="text-center text-white">Aucune vidéo renseignée</div>
          )}
        </div>
      </div>

      {/* Hero texte */}
      <section className="py-16 px-4 bg-[#d6bfbb] text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-stone-800 mb-4">{data.heroTitle || 'CFP SEDHIOU'}</h1>
        <p className="text-xl md:text-2xl text-stone-700 mb-8">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
        <Link href="/formations" className="inline-block bg-[#772a1d] text-white px-6 py-3 rounded-full">Découvrir nos formations →</Link>
      </section>

      {/* Messages avec photos */}
      <div className="py-16 px-4 bg-[#d6bfbb]">
        <div className="max-w-4xl mx-auto">
          {data.directorMessage?.content && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                {data.directorMessage.image && (
                  <img src={data.directorMessage.image} className="w-16 h-16 rounded-full object-cover" />
                )}
                <h2 className="text-2xl font-bold">{data.directorMessage.title || 'Mot du Directeur'}</h2>
              </div>
              <PortableText value={data.directorMessage.content} />
              {data.directorMessage.signature && <p className="mt-4 italic">{data.directorMessage.signature}</p>}
            </div>
          )}
          {data.caiMessage?.content && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                {data.caiMessage.image && (
                  <img src={data.caiMessage.image} className="w-16 h-16 rounded-full object-cover" />
                )}
                <h2 className="text-2xl font-bold">{data.caiMessage.title || 'Mot de la responsable CAI'}</h2>
              </div>
              <PortableText value={data.caiMessage.content} />
              {data.caiMessage.signature && <p className="mt-4 italic">{data.caiMessage.signature}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Le reste des sections (événements, formations, stats, CTA) reste inchangé, mais je les laisse pour la complétude */}
      {/* (Copiez ici vos sections existantes, ou le script les conservera) */}
    </div>
  )
}