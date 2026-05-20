import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAccueil() {
  try {
    const query = `*[_type == "accueil"][0]{
      heroTitle,
      heroSubtitle,
      videoUrl,
      heroImage,
      contentBlocks
    }`
    const data = await client.fetch(query)
    console.log("Données accueil récupérées:", data) // pour debug
    return data
  } catch (error) {
    console.error("Erreur chargement accueil:", error)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()

  return (
    <div className="animate-fade-in">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-bordeaux-800 to-bordeaux-700 text-white">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">{data?.heroTitle || 'Bienvenue au CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200">{data?.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="btn-modern-black animate-fade-in animation-delay-400">Découvrir nos formations →</Link>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {data?.contentBlocks ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg text-gray-800">
            <PortableText value={data.contentBlocks} />
          </div>
        ) : (
          <p className="text-center text-gray-600">Aucun contenu pour le moment. Veuillez créer un document "accueil" dans Sanity.</p>
        )}
      </div>
    </div>
  )
}