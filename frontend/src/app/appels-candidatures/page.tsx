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
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function AppelsPage() {
  const appels = await getAppels()
  const now = new Date()
  if (!appels.length) return <div className="pt-32 text-center">Aucun appel</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Appels à candidatures</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {appels.map((a) => {
            const isOpen = a.status === 'open' && new Date(a.deadline) > now
            return (
              <div key={a._id} className="card-glass p-6">
                <h2 className="text-2xl font-bold">{a.title}</h2>
                <p className="text-white/80">{a.description}</p>
                <p className="text-white/70 text-sm">📅 {new Date(a.deadline).toLocaleDateString()}</p>
                <p className={`font-semibold ${isOpen ? 'text-green-300' : 'text-red-300'}`}>{isOpen ? 'Ouvert' : 'Clos'}</p>
                {isOpen && <Link href={`/appels-candidatures/${a.slug}`} className="inline-block mt-4 bg-white text-bordeaux-800 px-4 py-2 rounded hover:bg-gray-200 transition">Postuler</Link>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}