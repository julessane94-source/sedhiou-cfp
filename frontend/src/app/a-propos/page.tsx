import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Types
interface Stat { value: string; label: string }
interface Value { icon: string; title: string; description: string }
interface TeamMember { name: string; role: string; image?: { asset?: { url: string } } }
interface TimelineItem { year: string; title: string; description: string }
interface Partner { name: string; logo?: { asset?: { url: string } }; url?: string }
interface FaqItem { question: string; answer: string }

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
      timeline,
      partners,
      faq,
      ctaTitle,
      ctaLink
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement à propos:", error)
    return null
  }
}

export default async function AProposPage() {
  const data = await getAPropos()
  if (!data) return <div className="pt-32 text-center">Chargement...</div>

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-stone-800 mb-6">{data.heroTitle}</h1>
        <p className="text-center text-stone-600 mb-12">{data.heroSubtitle}</p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Mission</h2>
            {data.mission && <PortableText value={data.mission} />}
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Vision</h2>
            {data.vision && <PortableText value={data.vision} />}
          </div>
        </div>

        {/* Timeline / Histoire */}
        {data.timeline && data.timeline.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Notre histoire</h2>
            <div className="relative border-l-4 border-[#772a1d] ml-4 pl-6 space-y-8">
              {data.timeline.map((item: TimelineItem, idx: number) => (
                <div key={idx}>
                  <div className="absolute w-3 h-3 bg-[#772a1d] rounded-full -left-[1.9rem] mt-2"></div>
                  <h3 className="text-xl font-bold text-[#772a1d]">{item.year} - {item.title}</h3>
                  <p className="text-stone-700 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistiques */}
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {data.stats.map((s: Stat, i: number) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-[#772a1d]">{s.value}</div>
                <div className="text-stone-600 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Valeurs */}
        {data.values && data.values.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Nos valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.values.map((v: Value, i: number) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md">
                  <div className="text-5xl mb-3">{v.icon}</div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{v.title}</h3>
                  <p className="text-stone-600">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Équipe */}
        {data.team && data.team.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Notre équipe</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {data.team.map((member: TeamMember, i: number) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-stone-200 flex items-center justify-center text-4xl mb-4">
                    {member.image?.asset?.url ? (
                      <img src={member.image.asset.url} alt={member.name} className="w-full h-full object-cover" />
                    ) : '👤'}
                  </div>
                  <h3 className="font-bold text-lg text-stone-800">{member.name}</h3>
                  <p className="text-stone-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partenaires */}
        {data.partners && data.partners.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Nos partenaires</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {data.partners.map((partner: Partner, i: number) => (
                <a key={i} href={partner.url || '#'} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition">
                  {partner.logo?.asset?.url ? (
                    <img src={partner.logo.asset.url} alt={partner.name} className="h-16 w-auto object-contain" />
                  ) : (
                    <span className="text-stone-700 font-semibold">{partner.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {data.faq && data.faq.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-stone-800 mb-10">Questions fréquentes</h2>
            <div className="space-y-4">
              {data.faq.map((item: FaqItem, i: number) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-[#772a1d] mb-2">{item.question}</h3>
                  <p className="text-stone-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link href={data.ctaLink || '/inscription'} className="inline-block bg-[#772a1d] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#5c2016] transition">
            {data.ctaTitle || 'Rejoignez-nous'}
          </Link>
        </div>
      </div>
    </div>
  )
}