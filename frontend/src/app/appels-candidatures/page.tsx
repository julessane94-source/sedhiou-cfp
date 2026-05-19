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
      "slug": slug.current
    }`
    return await client.fetch(query)
  } catch (e) { return [] }
}

export default async function AppelsPage() {
  const appels = await getAppels()
  const now = new Date()
  return (
    <div className="pt-32 pb-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Appels Ã  candidatures</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {appels.map((a) => {
          const isOpen = a.status === 'open' && new Date(a.deadline) > now
          return (
            <div key={a._id} className="bg-white shadow p-6 rounded">
              <h2 className="text-2xl font-bold">{a.title}</h2>
              <p>{a.description}</p>
              <p className="text-sm text-gray-500">ðŸ“… {new Date(a.deadline).toLocaleDateString()}</p>
              <p className={`font-semibold ${isOpen ? 'text-bordeaux-600' : 'text-red-600'}`}>
                {isOpen ? 'Ouvert' : 'Clos'}
              </p>
              {isOpen && <Link href={`/appels-candidatures/${a.slug}`} className="inline-block mt-4 bg-red-700 text-white px-4 py-2 rounded">Postuler</Link>}
            </div>
          )
        })}
      </div>
    </div>
  )
}