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
      contentBlocks,
      directorMessage,
      caiMessage,
      featuredEvents,
      featuredFormations,
      stats,
      bottomCta
    }`
    const data = await client.fetch(query)
    console.log("[HOME] DonnÃ©es rÃ©cupÃ©rÃ©es :", data ? "OK" : "null")
    return data
  } catch (err) {
    console.error("[HOME] Erreur Sanity :", err)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) {
    return <div className="pt-32 text-center text-stone-800">Aucune donnÃ©e dâ€™accueil. VÃ©rifiez le document dans Sanity Studio.</div>
  }
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#d6bfbb] text-stone-800">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.heroTitle || 'CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8">{data.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="bg-[#772a1d] text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-100">DÃ©couvrir nos formations â†’</Link>
        </div>
      </section>
      {/* Afficher le reste des sections si elles existent */}
      {data.contentBlocks && <div className="container mx-auto px-4 py-12 max-w-4xl"><PortableText value={data.contentBlocks} /></div>}
    </div>
  )
}