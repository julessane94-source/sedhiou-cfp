import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAccueil() {
  try {
    const query = `*[_type == "accueil"][0]{
      heroTitle,
      heroSubtitle,
      videoUrl,
      "heroImage": heroImage.asset->url,
      contentBlocks,
      sectionTitle1,
      sectionContent1,
      sectionTitle2,
      sectionContent2,
      ctaText,
      ctaLink
    }`
    const data = await client.fetch(query)
    console.log("Données accueil chargées :", data ? "OK" : "null")
    return data
  } catch (error) {
    console.error("Erreur chargement accueil:", error)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#d6bfbb' }}>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-white overflow-hidden">
        {data?.heroImage && (
          <div className="absolute inset-0 z-0">
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover opacity-30" />
          </div>
        )}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up text-stone-900">
            {data?.heroTitle || 'Bienvenue au CFP SEDHIOU'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200 text-stone-800">
            {data?.heroSubtitle || 'Formez-vous pour un avenir meilleur'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={data?.ctaLink || '/formations'} className="btn-modern btn-primary">
              {data?.ctaText || 'Découvrir nos formations →'}
            </Link>
            <Link href="/inscription" className="btn-modern btn-white">
              Inscription
            </Link>
          </div>
        </div>
      </section>

      {/* Contenu éditable principal (blocs riches) */}
      {data?.contentBlocks && data.contentBlocks.length > 0 && (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="prose prose-lg max-w-none text-stone-800">
            <PortableText value={data.contentBlocks} />
          </div>
        </div>
      )}

      {/* Section personnalisée 1 */}
      {data?.sectionTitle1 && (
        <div className="container mx-auto px-4 py-12 max-w-4xl border-t border-stone-300">
          <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.sectionTitle1}</h2>
          {data.sectionContent1 && <PortableText value={data.sectionContent1} />}
        </div>
      )}

      {/* Section personnalisée 2 */}
      {data?.sectionTitle2 && (
        <div className="container mx-auto px-4 py-12 max-w-4xl border-t border-stone-300">
          <h2 className="text-3xl font-bold text-stone-800 mb-4">{data.sectionTitle2}</h2>
          {data.sectionContent2 && <PortableText value={data.sectionContent2} />}
        </div>
      )}

      {/* Vidéo intégrée */}
      {data?.videoUrl && (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="aspect-video">
            <iframe
              src={data.videoUrl}
              className="w-full h-full rounded-xl shadow-lg"
              allowFullScreen
              title="Vidéo de présentation"
            />
          </div>
        </div>
      )}
    </div>
  )
}