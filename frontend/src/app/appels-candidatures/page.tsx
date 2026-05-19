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
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function AppelsPage() {
  const appels = await getAppels()
  const now = new Date()

  if (!appels || appels.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold">Appels Ã  candidatures</h1>
        <p className="text-gray-600 mt-4">Aucun appel disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-12">
          Appels Ã  candidatures
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          {appels.map((appel: any) => {
            const isOpen = appel.status === 'open' && new Date(appel.deadline) > now
            return (
              <div key={appel._id} className="card-glass p-6">
                <h2 className="text-xl font-bold mb-2">{appel.title}</h2>
                <p className="text-gray-600 mb-2">{appel.description}</p>
                <p className="text-sm mb-2">ðŸ“… {new Date(appel.deadline).toLocaleDateString('fr-FR')}</p>
                <p className={`text-sm font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  {isOpen ? 'Ouvert' : 'Clos'}
                </p>
                {isOpen && (
                  <Link href={`/appels-candidatures/${appel.slug}`} className="btn-modern btn-primary inline-block mt-4">
                    Postuler
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