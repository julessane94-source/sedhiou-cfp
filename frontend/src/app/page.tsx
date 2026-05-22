'use client'

import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Composant Carrousel simple
function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])
  if (!images.length) return null
  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img src={img} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

async function getAccueil() {
  try {
    const res = await fetch('/api/accueil')
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('getAccueil: bad response', res.status, text)
      return null
    }
    return await res.json()
  } catch (err) {
    console.error('getAccueil error', err)
    return null
  }
}

export default function HomePage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setError(null)
    const d = await getAccueil()
    if (!d) setError('Impossible de charger les données.')
    setData(d)
  }

  useEffect(() => { load() }, [])
  if (!data) return (
    <div className="pt-24 text-center">
      {error ? (
        <div>
          <div className="mb-4">Erreur: {error}</div>
          <button className="px-4 py-2 bg-[#772a1d] text-white rounded" onClick={load}>Réessayer</button>
        </div>
      ) : (
        <div>Chargement...</div>
      )}
    </div>
  )

  const carouselImages = data.carouselImages?.map((img: any) => img.url) || []
  if (data.heroImage && carouselImages.length === 0) carouselImages.push(data.heroImage)

  return (
    <div>
      {/* HERO AVEC CARROUSEL */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {carouselImages.length > 0 ? (
          <div className="absolute inset-0 z-0">
            <ImageCarousel images={carouselImages} />
          </div>
        ) : data.videoUrl ? (
          <div className="absolute inset-0 w-full h-full z-0">
            <iframe src={data.videoUrl} className="w-full h-full object-cover" frameBorder="0" allowFullScreen />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full z-0">
            <img src="/images/hero-placeholder.svg" className="w-full h-full object-cover" alt="Image par défaut" />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}
        <div className="relative z-10 text-center px-4 text-white max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{data.heroTitle || 'CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link
            href="/formations"
            className="inline-block bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Découvrir nos formations →
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* MESSAGES (directeur / CAI) avec animations */}
      <div className="py-16 px-4 bg-[#d6bfbb]">
        <div className="max-w-5xl mx-auto space-y-8">
          {data.directorMessage?.content && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition animate-fade-in-up">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img src={data.directorMessage.image || '/images/avatar-placeholder.svg'} className="w-24 h-24 rounded-full object-cover border-4 border-[#772a1d] shadow-md" alt="Directeur" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-stone-800 mb-2">{data.directorMessage.title || 'Mot du Directeur'}</h2>
                  <div className="prose prose-stone max-w-none"><PortableText value={data.directorMessage.content} /></div>
                  {data.directorMessage.signature && <p className="mt-3 italic text-stone-600">{data.directorMessage.signature}</p>}
                </div>
              </div>
            </div>
          )}
          {data.caiMessage?.content && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition animate-fade-in-up animation-delay-200">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img src={data.caiMessage.image || '/images/avatar-placeholder.svg'} className="w-24 h-24 rounded-full object-cover border-4 border-[#772a1d] shadow-md" alt="Responsable CAI" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-stone-800 mb-2">{data.caiMessage.title || 'Mot de la responsable CAI'}</h2>
                  <div className="prose prose-stone max-w-none"><PortableText value={data.caiMessage.content} /></div>
                  {data.caiMessage.signature && <p className="mt-3 italic text-stone-600">{data.caiMessage.signature}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Événements, formations, stats, CTA – conservés avec animations */}
      {/* ... (le reste du contenu identique à la version précédente, avec animations sur les cartes) ... */}
      {data.featuredEvents?.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-10 animate-fade-in-up">Événements à venir</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.featuredEvents.map((event: any, idx: number) => (
              <div key={event._id} className="bg-stone-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                {event.coverImage && <img src={event.coverImage} className="w-full h-48 object-cover" />}
                <div className="p-5">
                  <p className="text-sm text-stone-500">{new Date(event.publishedAt).toLocaleDateString()}</p>
                  <h3 className="text-xl font-bold text-stone-800">{event.title}</h3>
                  <p className="text-stone-600 line-clamp-3">{event.excerpt}</p>
                  <Link href={`/actualites/${event.slug}`} className="inline-block mt-3 text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {data.featuredFormations?.length > 0 && (
        <section className="py-16 px-4 bg-stone-100">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-10 animate-fade-in-up">Formations en vedette</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.featuredFormations.map((formation: any, idx: number) => (
              <div key={formation._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                {formation.imageUrl && <img src={formation.imageUrl} className="w-full h-48 object-cover" />}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-stone-800">{formation.title}</h3>
                  <p className="text-stone-600 line-clamp-3">{formation.description}</p>
                  <Link href={`/formations/${formation.slug}`} className="inline-block mt-3 text-[#772a1d] font-semibold hover:underline">En savoir plus →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {data.stats?.length > 0 && (
        <div className="py-16 px-4 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {data.stats.map((stat: any, idx: number) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl font-bold text-[#772a1d]">{stat.value}</div>
                <div className="text-stone-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.bottomCta && (
        <div className="py-16 px-4 bg-[#772a1d] text-white text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">{data.bottomCta.text}</h2>
          <Link href={data.bottomCta.link || '/inscription'} className="inline-block bg-white text-[#772a1d] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg">Je m'inscris</Link>
        </div>
      )}
    </div>
  )
}