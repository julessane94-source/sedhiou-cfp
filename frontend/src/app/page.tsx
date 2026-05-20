import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAccueil() {
  try {
    console.log("Récupération des données accueil...")
    const query = `*[_type == "accueil"][0]{
      heroTitle,
      heroSubtitle,
      videoUrl,
      heroImage,
      contentBlocks
    }`
    const data = await client.fetch(query)
    console.log("Données accueil reçues:", data ? "OK" : "null")
    return data
  } catch (error) {
    console.error("Erreur chargement accueil:", error)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  const hasContent = data && (data.heroTitle || data.contentBlocks)

  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-stone-700 to-stone-800 text-white">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">
            {data?.heroTitle || 'Bienvenue au CFP SEDHIOU'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200">
            {data?.heroSubtitle || 'Formez-vous pour un avenir meilleur'}
          </p>
          <Link href="/formations" className="btn-modern btn-white">
            Découvrir nos formations →
          </Link>
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
            {!hasContent && (
              <div className="mt-4 p-4 bg-yellow-800/30 rounded">
                <p className="text-yellow-200">⚠️ Aucune donnée trouvée dans Sanity.</p>
                <p className="text-xs">Vérifiez que le document "accueil" existe et est PUBLIÉ.</p>
                <a href="/debug-accueil" className="text-amber-300 underline">Voir debug →</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}