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
    const data = await client.fetch(query)
    console.log("APropos data:", data)
    return data
  } catch (error) {
    console.error("Erreur chargement à propos:", error)
    return null
  }
}

export default async function AProposPage() {
  const data = await getAPropos()
  if (!data) return <div className="pt-32 text-center text-stone-600">Chargement...</div>

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-stone-800 mb-4">{data.heroTitle || 'À propos du CFP SEDHIOU'}</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">{data.heroSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card-glass p-8 animate-slide-left">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Notre mission</h2>
            {data.mission && <PortableText value={data.mission} />}
          </div>
          <div className="card-glass p-8 animate-slide-right">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Notre vision</h2>
            {data.vision && <PortableText value={data.vision} />}
          </div>
        </div>

        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {data.stats.map((stat: any, idx: number) => (
              <div key={idx} className="card-glass text-center p-6 animate-fade-in delay-100" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl font-bold text-stone-700">{stat.value}</div>
                <div className="text-stone-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {data.values && data.values.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">Nos valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.values.map((value: any, idx: number) => (
                <div key={idx} className="card-glass text-center p-8 animate-fade-in delay-200" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="text-5xl mb-4">{value.icon || '✨'}</div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{value.title}</h3>
                  <p className="text-stone-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.team && data.team.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">Notre équipe</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {data.team.map((member: any, idx: number) => (
                <div key={idx} className="card-glass text-center p-6 animate-fade-in delay-300" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="w-32 h-32 mx-auto rounded-full bg-stone-200 flex items-center justify-center text-4xl mb-4 overflow-hidden">
                    {member.image?.asset?.url ? <img src={member.image.asset.url} className="w-full h-full object-cover" /> : '👤'}
                  </div>
                  <h3 className="font-bold text-stone-800 text-lg">{member.name}</h3>
                  <p className="text-stone-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-8">
          <Link href={data.ctaLink || '/inscription'} className="btn-modern btn-primary inline-block">
            {data.ctaTitle || 'Rejoignez-nous'} →
          </Link>
        </div>
      </div>
    </div>
  )
}