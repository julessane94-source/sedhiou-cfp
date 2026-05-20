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
    console.log("DEBUG Accueil Sanity:", data)
    return data
  } catch (error) {
    console.error("Erreur chargement accueil:", error)
    return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data?.heroTitle || 'Bienvenue au CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8">{data?.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">Découvrir nos formations</Link>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16 max-w-4xl text-gray-800">
        {data?.contentBlocks && <PortableText value={data.contentBlocks} />}
      </div>
    </div>
  )
}