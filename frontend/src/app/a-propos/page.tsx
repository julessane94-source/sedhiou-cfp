import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Stat = { value: string; label: string }

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
  if (!data) return <div className="pt-32 text-center">Chargement...</div>
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6 text-white">{data.heroTitle}</h1>
        <p className="text-center text-gray-200 mb-12">{data.heroSubtitle}</p>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card-glass p-6"><h2 className="text-2xl font-bold mb-4 text-white">Mission</h2><PortableText value={data.mission} /></div>
          <div className="card-glass p-6"><h2 className="text-2xl font-bold mb-4 text-white">Vision</h2><PortableText value={data.vision} /></div>
        </div>
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {data.stats.map((stat: Stat, idx: number) => (
              <div key={idx} className="card-glass p-4 text-center">
                <div className="text-3xl font-bold text-bordeaux-300">{stat.value}</div>
                <div className="text-gray-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center">
          <Link href={data.ctaLink || '/inscription'} className="btn-modern btn-primary">
            {data.ctaTitle || 'Rejoignez-nous'}
          </Link>
        </div>
      </div>
    </div>
  )
}