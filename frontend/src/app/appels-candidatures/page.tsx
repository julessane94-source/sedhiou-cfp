import { client } from '@/lib/sanity/client'
import Link from 'next/link'

interface Appel {
  _id: string
  title: string
  description: string
  deadline: string
  status: string
  slug: string
  googleFormUrl?: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAppels(): Promise<Appel[]> {
  try {
    const query = `*[_type == "appelCandidature"] | order(deadline asc) {
      _id,
      title,
      description,
      deadline,
      status,
      "slug": slug.current,
      googleFormUrl
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement appels:", error)
    return []
  }
}

export default async function AppelsPage() {
  const appels = await getAppels()
  const now = new Date()
  if (!appels.length) return <div className="pt-32 text-center text-white">Aucun appel à candidatures actuellement.</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">Appels à candidatures</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {appels.map((a) => {
            const isOpen = a.status === 'open' && new Date(a.deadline) > now
            return (
              <div key={a._id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-2">{a.title}</h2>
                <p className="text-gray-200 mb-4">{a.description}</p>
                <p className="text-gray-300 text-sm mb-2">📅 {new Date(a.deadline).toLocaleDateString()}</p>
                <p className={`font-semibold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
                  {isOpen ? '✅ Ouvert' : '❌ Fermé'}
                </p>
                {isOpen && <Link href={`/appels-candidatures/${a.slug}`} className="btn-modern-black inline-block mt-4">Postuler maintenant</Link>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}