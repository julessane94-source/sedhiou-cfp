import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import FaqBlock from '@/components/sanity/FaqBlock'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAPropos() {
  const query = `*[_type == "aPropos"][0]{
    heroTitle,
    heroSubtitle,
    mission,
    vision,
    stats,
    values,
    ctaTitle,
    ctaLink,
    timeline,
    partners,
    faqs
  }`
  return await client.fetch(query)
}

export default async function AProposPage() {
  const data = await getAPropos()
  return (
    <div className="pt-32 pb-20 px-4 bg-transparent">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">{data?.heroTitle || 'À propos'}</h1>
        <p className="text-center text-white/90 mb-12">{data?.heroSubtitle}</p>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card-glass p-6"><h2 className="text-2xl font-bold mb-4">Mission</h2>{data?.mission && <PortableText value={data.mission} />}</div>
          <div className="card-glass p-6"><h2 className="text-2xl font-bold mb-4">Vision</h2>{data?.vision && <PortableText value={data.vision} />}</div>
        </div>
        {data?.stats && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">{data.stats.map((s,i) => <div key={i} className="text-center card-glass p-4"><div className="text-2xl font-bold text-green-700">{s.value}</div><div>{s.label}</div></div>)}</div>}
        {data?.values && <div><h2 className="text-3xl font-bold text-center mb-8">Nos valeurs</h2><div className="grid md:grid-cols-3 gap-6">{data.values.map((v,i) => <div key={i} className="card-glass p-6 text-center"><div className="text-4xl mb-3">{v.icon}</div><h3 className="text-xl font-bold mb-2">{v.title}</h3><p>{v.description}</p></div>)}</div></div>}
        {data?.timeline && <div className="mt-12"><h2 className="text-3xl font-bold mb-6">Notre histoire</h2><div className="space-y-4">{data.timeline.map((t:any,i:number)=> <div key={i} className="card-glass p-4"><div className="text-sm text-green-700 font-bold">{t.year}</div><div className="mt-2"><PortableText value={t.content} /></div></div>)}</div></div>}
        {data?.partners && <div className="mt-12"><h2 className="text-3xl font-bold mb-6">Partenaires</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{data.partners.map((p:any,i:number)=><div key={i} className="p-4 text-center card-glass"><img src={p.logo?.asset?.url} alt={p.name} className="mx-auto h-12 object-contain"/><div className="mt-2"><a href={p.url} className="text-sm text-green-700">{p.name}</a></div></div>)}</div></div>}
        {data?.faqs && <FaqBlock faqs={data.faqs} />}
        <div className="text-center mt-12"><Link href={data?.ctaLink || '/inscription'} className="btn-modern btn-primary">{data?.ctaTitle || 'Rejoignez-nous'}</Link></div>
      </div>
    </div>
  )
}
