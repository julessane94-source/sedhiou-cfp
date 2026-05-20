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
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement accueil:", error)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-stone-700 to-stone-800 text-white">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">{data?.heroTitle || 'Bienvenue au CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200">{data?.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="btn-modern btn-white">Découvrir nos formations →</Link>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {data?.contentBlocks ? (
          <PortableText value={data.contentBlocks} />
        ) : (
          <div className="text-center text-gray-300 bg-stone-800/50 p-8 rounded-lg">
            <p>Contenu de la page d'accueil à personnaliser.</p>
            <p className="text-sm mt-2">
              (Si vous êtes administrateur, connectez-vous à Sanity Studio, créez/modifiez le document "Accueil" et publiez-le.)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}