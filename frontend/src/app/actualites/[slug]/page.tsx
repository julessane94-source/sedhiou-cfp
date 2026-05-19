import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Stat = { value: string; label: string }
type Value = { icon: string; title: string; description: string }
type TeamMember = { name: string; role: string; image?: { asset?: { url: string } } }

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
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function AProposPage() {
  const data = await getAPropos()

  if (!data) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold">Ã€ propos</h1>
        <p className="text-gray-600 mt-4">Chargement des donnÃ©es...</p>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-green-800 mb-4">{data.heroTitle || 'Ã€ propos du CFP SEDHIOU'}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.heroSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Notre mission</h2>
            {data.mission && <PortableText value={data.mission} />}
          </div>
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Notre vision</h2>
            {data.vision && <PortableText value={data.vision} />}
          </div>
        </div>

        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {data.stats.map((stat: Stat, i: number) => (
              <div key={i} className="card-glass text-center p-6">
                <div className="text-3xl font-bold text-green-700">{stat.value}</div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {data.values && data.values.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.values.map((value: Value, i: number) => (
                <div key={i} className="card-glass text-center p-8">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.team && data.team.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Notre Ã©quipe</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {data.team.map((member: TeamMember, i: number) => (
                <div key={i} className="card-glass text-center p-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center text-4xl mb-4 overflow-hidden">
                    {member.image?.asset?.url ? (
                      <img src={member.image.asset.url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      'ðŸ‘¤'
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-8">
          <Link href={data.ctaLink || '/inscription'} className="btn-modern btn-primary">
            {data.ctaTitle || 'Rejoignez-nous'}
          </Link>
        </div>
      </div>
    </div>
  )
}