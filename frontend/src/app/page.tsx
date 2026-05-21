import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Types
interface Stat { value: string; label: string }
interface FeaturedFormation { _id: string; title: string; description: string; slug: string; imageUrl?: string }
interface FeaturedEvent { _id: string; title: string; excerpt: string; slug: string; coverImage?: string; publishedAt: string }
interface Message { title: string; content: any; image?: string; signature?: string }
interface BottomCta { text: string; link: string }

async function getAccueil() {
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
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div className="pt-32 text-center">Chargement...</div>

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-900 text-white overflow-hidden">
        {data.videoUrl ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe src={data.videoUrl} className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        ) : data.heroImage ? (
          <div className="absolute inset-0"><img src={data.heroImage} className="w-full h-full object-cover opacity-30" /></div>
        ) : null}
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.heroTitle || 'Bienvenue au CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-left delay-200">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="btn-modern btn-white animate-fade-right delay-300">Découvrir nos formations →</Link>
        </div>
      </section>

      {/* DIRECTOR MESSAGE */}
      {data.directorMessage?.content && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden md:flex animate-fade-left">
            {data.directorMessage.image && <div className="md:w-1/3 h-64 md:h-auto overflow-hidden"><img src={data.directorMessage.image} className="w-full h-full object-cover" /></div>}
            <div className="p-8 md:w-2/3">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.directorMessage.title || 'Mot du Directeur'}</h2>
              <div className="prose prose-stone"><PortableText value={data.directorMessage.content} /></div>
              {data.directorMessage.signature && <p className="mt-4 italic text-stone-600">{data.directorMessage.signature}</p>}
            </div>
          </div>
        </section>
      )}

      {/* CAI MESSAGE */}
      {data.caiMessage?.content && (
        <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-stone-50 to-transparent">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden md:flex animate-fade-right flex-row-reverse">
            {data.caiMessage.image && <div className="md:w-1/3 h-64 md:h-auto overflow-hidden"><img src={data.caiMessage.image} className="w-full h-full object-cover" /></div>}
            <div className="p-8 md:w-2/3">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.caiMessage.title || 'Mot du responsable CAI'}</h2>
              <div className="prose prose-stone"><PortableText value={data.caiMessage.content} /></div>
              {data.caiMessage.signature && <p className="mt-4 italic text-stone-600">{data.caiMessage.signature}</p>}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED EVENTS */}
      {data.featuredEvents && data.featuredEvents.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-12 animate-fade-up">Événements à venir</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.featuredEvents.map((event: FeaturedEvent, idx: number) => (
              <div key={event._id} className="card-glass group hover:scale-[1.02] transition-all duration-500 animate-scale" style={{ animationDelay: `${idx * 0.1}s` }}>
                {event.coverImage && <div className="h-48 overflow-hidden rounded-t-2xl"><img src={event.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>}
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

      {/* FEATURED FORMATIONS */}
      {data.featuredFormations && data.featuredFormations.length > 0 && (
        <section className="bg-stone-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-12 animate-fade-up">Formations en vedette</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredFormations.map((formation: FeaturedFormation, idx: number) => (
                <div key={formation._id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
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

      {/* STATS */}
      {data.stats && data.stats.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: Stat, idx: number) => (
              <div key={idx} className="text-center animate-scale" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl font-bold text-[#772a1d]">{stat.value}</div>
                <div className="text-stone-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      {data.bottomCta && (
        <div className="bg-[#772a1d] py-20 text-white text-center">
          <div className="container mx-auto px-4 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">{data.bottomCta.text}</h2>
            <Link href={data.bottomCta.link || '/inscription'} className="btn-modern btn-white">Je m'inscris</Link>
          </div>
        </div>
      )}
    </div>
  )
}