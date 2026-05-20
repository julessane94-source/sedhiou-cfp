import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAPropos() {
  try {
    const query = `*[_type == "aPropos"][0]{
      heroTitle,
      heroSubtitle,
      mission,
      vision,
      stats,
      values,
      team,
      ctaTitle,
      ctaLink
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement Ã  propos:", error)
    return null
  }
}

export default async function AProposPage() {
  const data = await getAPropos()
  if (!data) return <div className="pt-32 text-center text-white">Chargement...</div>
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-stone-100 to-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-stone-800 mb-6 animate-fade-in">{data.heroTitle}</h1>
        <p className="text-center text-stone-600 mb-12 animate-fade-in animation-delay-200">{data.heroSubtitle}</p>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card-light"><h2 className="text-2xl font-bold text-stone-800 mb-4">Mission</h2><PortableText value={data.mission} /></div>
          <div className="card-light"><h2 className="text-2xl font-bold text-stone-800 mb-4">Vision</h2><PortableText value={data.vision} /></div>
        </div>
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {data.stats.map((s: { value: string; label: string }, i: number) => (
              <div key={i} className="card-light text-center">
                <div className="text-3xl font-bold text-amber-700">{s.value}</div>
                <div className="text-stone-600 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center">
          <Link href={data.ctaLink || '/inscription'} className="btn-modern btn-primary">{data.ctaTitle || 'Rejoignez-nous'}</Link>
        </div>
      </div>
    </div>
  )
}