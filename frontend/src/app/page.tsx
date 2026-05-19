import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAccueil() {
  try {
    const query = `*[_type == "accueil"][0]{
      heroTitle,
      heroSubtitle,
      videoUrl,
      contentBlocks
    }`
    return await client.fetch(query)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function Home() {
  const data = await getAccueil()

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-bordeaux-900 to-bordeaux-800 text-white">
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data?.heroTitle || 'CFP SEDHIOU'}</h1>
          <p className="text-xl md:text-2xl mb-8">{data?.heroSubtitle || 'Formez-vous pour un avenir meilleur'}</p>
          <Link href="/formations" className="btn-modern btn-primary inline-flex items-center gap-2">
            Découvrir nos formations <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {data?.contentBlocks && <PortableText value={data.contentBlocks} />}
      </div>
    </div>
  )
}