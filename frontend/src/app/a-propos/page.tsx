import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

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
  if (!data) return <div className="pt-32 text-center">Chargement...</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">{data.heroTitle}</h1>
        <p className="text-center text-gray-600 mb-12">{data.heroSubtitle}</p>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded shadow"><h2 className="text-2xl font-bold mb-4">Mission</h2><PortableText value={data.mission} /></div>
          <div className="bg-white p-6 rounded shadow"><h2 className="text-2xl font-bold mb-4">Vision</h2><PortableText value={data.vision} /></div>
        </div>
        {data.stats && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">{data.stats.map((s,i)=><div key={i} className="bg-white p-4 text-center rounded shadow"><div className="text-3xl font-bold text-red-700">{s.value}</div><div>{s.label}</div></div>)}</div>}
        <div className="text-center"><Link href={data.ctaLink||'/inscription'} className="bg-red-700 text-white px-6 py-3 rounded-full inline-block">{data.ctaTitle||'Rejoignez-nous'}</Link></div>
      </div>
    </div>
  )
}