import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Stat { value: string; label: string }
interface Value { icon: string; title: string; description: string }
interface TeamMember {
  name: string
  role: string
  image?: {
    asset?: {
      url?: string
    }
  }
}
interface TimelineItem { year: string; title: string; description: string }
interface Partner { name: string; logo?: { asset?: { url?: string } }; url?: string }
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
      team[]{
        name,
        role,
        "imageUrl": image.asset->url
      },
      timeline,
      partners,
      faq,
      ctaTitle,
      ctaLink
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Erreur chargement à propos:', error)
    return null
  }
}

export default async function AProposPage() {
  const data = await getAPropos()
  if (!data) return <div className="pt-24 text-center">Chargement...</div>

  return (
    <div className="pt-24 pb-20 px-4 bg-[#f7f2ef]">
      <div className="max-w-7xl mx-auto">
        <section className="bg-white rounded-[2rem] shadow-[0_24px_80px_rgba(119,42,29,0.12)] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-10">
            <div className="p-10 lg:p-16">
              <p className="uppercase tracking-[0.35em] text-sm text-[#772a1d] mb-6">À propos</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight mb-6">{data.heroTitle}</h1>
              <p className="text-stone-700 max-w-2xl leading-8">{data.heroSubtitle}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#772a1d] bg-opacity-5 p-5">
                  <p className="text-3xl font-bold text-[#772a1d]">{data.stats?.[0]?.value || '—'}</p>
                  <p className="mt-2 text-sm text-stone-600">{data.stats?.[0]?.label || 'Années d’expérience'}</p>
                </div>
                <div className="rounded-3xl bg-[#772a1d] bg-opacity-5 p-5">
                  <p className="text-3xl font-bold text-[#772a1d]">{data.stats?.[1]?.value || '—'}</p>
                  <p className="mt-2 text-sm text-stone-600">{data.stats?.[1]?.label || 'Étudiants accompagnés'}</p>
                </div>
              </div>
            </div>
            <div className="relative bg-[#772a1d] text-white p-10 lg:p-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_20%)]" />
              <div className="relative text-center">
                <h2 className="text-3xl font-bold mb-4">Notre engagement</h2>
                <p className="text-stone-100 leading-7">Porter un accompagnement réel, structuré et ambitieux pour chaque jeune en formation.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/10 p-5">
                    <h3 className="text-sm uppercase tracking-[0.24em] text-stone-200">Mission</h3>
                    <div className="mt-3 text-sm leading-6 text-stone-100">
                      {data.mission ? <PortableText value={data.mission} /> : 'Créer des opportunités de formation professionnalisantes pour la région.'}
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5">
                    <h3 className="text-sm uppercase tracking-[0.24em] text-stone-200">Vision</h3>
                    <div className="mt-3 text-sm leading-6 text-stone-100">
                      {data.vision ? <PortableText value={data.vision} /> : 'Devenir un centre de référence où compétences et confiance grandissent ensemble.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {data.values && data.values.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-[#772a1d] mb-3">Valeurs</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Ce qui nous guide</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {data.values.map((v: Value, i: number) => (
                <div key={i} className="rounded-[2rem] bg-white p-8 shadow-lg border border-stone-200">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#772a1d] text-white text-3xl mb-6">{v.icon || '•'}</div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-3">{v.title}</h3>
                  <p className="text-stone-600 leading-7">{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.team && data.team.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-[#772a1d] mb-3">Équipe</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Les responsables</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.team.map((member: any, i: number) => (
                <div key={i} className="rounded-[2rem] bg-white p-6 shadow-lg border border-stone-200 text-center">
                  <div className="mx-auto mb-5 h-32 w-32 rounded-full overflow-hidden bg-stone-100 flex items-center justify-center">
                    {member.imageUrl ? (
                      <Image src={member.imageUrl} alt={member.name} width={160} height={160} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-4xl text-stone-400">👤</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900">{member.name}</h3>
                  <p className="mt-2 text-sm text-stone-500">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.partners && data.partners.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-[#772a1d] mb-3">Partenaires</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Ils nous soutiennent</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {data.partners.map((partner: Partner, i: number) => (
                <a key={i} href={partner.url || '#'} target="_blank" rel="noopener noreferrer" className="rounded-3xl bg-white p-6 shadow-sm border border-stone-200 flex items-center justify-center h-32">
                  {partner.logo?.asset?.url ? (
                    <img src={partner.logo.asset.url} alt={partner.name} className="h-16 object-contain" />
                  ) : (
                    <span className="font-semibold text-stone-700">{partner.name}</span>
                  )}
                </a>
              ))}
            </div>
          </section>
        )}

        {data.faq && data.faq.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-[#772a1d] mb-3">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Questions fréquentes</h2>
            </div>
            <div className="grid gap-4">
              {data.faq.map((item: FaqItem, i: number) => (
                <div key={i} className="rounded-[2rem] bg-white p-8 shadow-lg border border-stone-200">
                  <h3 className="text-xl font-semibold text-[#772a1d] mb-3">{item.question}</h3>
                  <p className="text-stone-600 leading-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 text-center">
          <Link href={data.ctaLink || '/inscription'} className="inline-flex items-center justify-center rounded-full bg-[#772a1d] px-10 py-4 text-white text-base font-semibold hover:bg-[#5c2016] transition">
            {data.ctaTitle || 'Rejoignez-nous'}
          </Link>
        </div>
      </div>
    </div>
  )
}
