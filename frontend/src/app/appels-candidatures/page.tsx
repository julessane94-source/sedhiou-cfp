import { client } from '@/lib/sanity/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAppels() {
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
    console.error(error)
    return []
  }
}

export default async function AppelsPage() {
  const appels = await getAppels()
  const now = new Date()
  if (!appels.length) return <div className="pt-32 text-center">Aucun appel</div>
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 animate-fade-in">Appels à candidatures</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {appels.map((a, i) => {
            const isOpen = a.status === 'open' && new Date(a.deadline) > now
            return (
              <div key={a._id} className="card-modern p-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{a.title}</h2>
                <p className="text-gray-600 mb-4">{a.description}</p>
                <p className="text-gray-500 text-sm mb-2">📅 {new Date(a.deadline).toLocaleDateString()}</p>
                <p className={`font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>{isOpen ? '✅ Ouvert' : '❌ Clos'}</p>
                {isOpen && <Link href={`/appels-candidatures/${a.slug}`} className="inline-block mt-4 bg-gray-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-700 transition">Postuler maintenant</Link>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}