import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

interface Stat { value: string; label: string }

export const dynamic = 'force-dynamic'

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
  } catch (e) { return null }
}

export default async function AProposPage() {
  const data = await getAPropos()
  if (!data) return <div className="pt-32 text-center text-white">Chargement...</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-white mb-6 animate-fade-in">{data.heroTitle}</h1>
        <p className="text-center text-gray-200 mb-12 animate-fade-in animation-delay-200">{data.heroSubtitle}</p>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-slide-up"><h2 className="text-2xl font-bold text-white mb-4">Mission</h2><PortableText value={data.mission} /></div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 animate-slide-up animation-delay-200"><h2 className="text-2xl font-bold text-white mb-4">Vision</h2><PortableText value={data.vision} /></div>
        </div>
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {data.stats.map((s: Stat, i: number) => (
              <div key={i} className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl font-bold text-white">{s.value}</div>
                <div className="text-gray-200 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center">
          <Link href={data.ctaLink || '/inscription'} className="inline-block bg-white text-bordeaux-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:-translate-y-1">🔗 {data.ctaTitle || 'Rejoignez-nous'}</Link>
        </div>
      </div>
    </div>
  )
}