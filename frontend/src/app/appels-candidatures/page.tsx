import { client } from '@/lib/sanity/client'
import Link from 'next/link'

interface Appel {
  _id: string
  title: string
  description: string
  deadline: string
  status: string
  slug: string
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
      "slug": slug.current
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
  if (!appels.length) return <div className="pt-24 text-center">Aucun appel à candidatures actuellement.</div>
  return (
    <div className="pt-24 pb-12 px-4 min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-stone-800 mb-8">Appels à candidatures</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {appels.map((a) => {
            const isOpen = a.status === 'open' && new Date(a.deadline) > now
            return (
              <div key={a._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-stone-800 mb-2">{a.title}</h2>
                <p className="text-stone-700 mb-4">{a.description}</p>
                <p className="text-stone-500 text-sm mb-2">📅 {new Date(a.deadline).toLocaleDateString()}</p>
                <p className={`font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>{isOpen ? '✅ Ouvert' : '❌ Fermé'}</p>
                {isOpen && (
                  <Link href={`/appels-candidatures/${a.slug}`} className="inline-block mt-4 bg-[#772a1d] text-white px-5 py-2 rounded-full hover:bg-[#5c2016] transition">
                    Postuler maintenant
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}