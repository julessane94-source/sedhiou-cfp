import { client } from '@/lib/sanity/client'
import Link from 'next/link'

function formatDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

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
  if (!appels.length) return <div className="pt-24 text-center">Aucun appel à candidatures pour le moment.</div>
  return (
    <div className="pt-24 pb-12 px-4 min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-stone-800 mb-4">Appels à candidatures</h1>
        <p className="text-center text-stone-600 mb-10">Postulez dès maintenant aux formations ouvertes</p>
        <div className="grid md:grid-cols-2 gap-8">
          {appels.map((a, idx) => {
            const isOpen = a.status === 'open' && new Date(a.deadline) > now
            return (
              <article key={a._id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1" style={{ animationDelay: `${idx * 60}ms` }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-2">{a.title}</h2>
                    <p className="text-stone-600 mb-3 line-clamp-3">{a.description}</p>
                    <p className="text-stone-500 text-sm">📅 {formatDate(a.deadline)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{isOpen ? 'Ouvert' : 'Fermé'}</span>
                  </div>
                </div>
                <div className="mt-5">
                  {isOpen ? (
                    <Link href={`/appels-candidatures/${a.slug}`} className="inline-block bg-[#772a1d] text-white px-5 py-2 rounded-full hover:bg-[#5c2016] transition">
                      Postuler maintenant
                    </Link>
                  ) : (
                    <Link href={`/appels-candidatures/${a.slug}`} className="inline-block border border-stone-200 text-stone-700 px-5 py-2 rounded-full hover:bg-stone-50 transition">
                      Voir les détails
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}