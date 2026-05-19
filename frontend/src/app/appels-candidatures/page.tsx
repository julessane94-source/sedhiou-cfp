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
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-bordeaux-50 to-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-bordeaux-800">Appels à candidatures</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {appels.map((a) => {
            const isOpen = a.status === 'open' && new Date(a.deadline) > now
            return (
              <div key={a._id} className="bg-white shadow p-6 rounded">
                <h2 className="text-2xl font-bold text-bordeaux-800">{a.title}</h2>
                <p className="text-gray-700">{a.description}</p>
                <p className="text-sm text-gray-500">📅 {new Date(a.deadline).toLocaleDateString()}</p>
                <p className={`font-semibold ${isOpen ? 'text-bordeaux-600' : 'text-gray-500'}`}>{isOpen ? 'Ouvert' : 'Clos'}</p>
                {isOpen && <Link href={`/appels-candidatures/${a.slug}`} className="inline-block mt-4 bg-bordeaux-700 text-white px-4 py-2 rounded">Postuler</Link>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}