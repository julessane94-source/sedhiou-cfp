import { client } from '@/lib/sanity.client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAppels() {
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
}

export default async function AppelsPage() {
  const appels = await getAppels()
  const now = new Date()

  return (
    <div className="pt-32 pb-20 px-4 bg-transparent min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-12">
          Appels à candidatures
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          {appels.map((appel) => {
            const isOpen = appel.status === 'open' && new Date(appel.deadline) > now
            return (
              <div key={appel._id} className="card-glass p-6">
                <h2 className="text-xl font-bold mb-2">{appel.title}</h2>
                <p className="text-white mb-2">{appel.description}</p>
                <p className="text-sm text-white/70 mb-4">📅 Date limite : {new Date(appel.deadline).toLocaleDateString('fr-FR')}</p>
                {isOpen ? (
                  <Link href={`/appels-candidatures/${appel.slug}`} className="btn-modern btn-primary inline-block">
                    Postuler
                  </Link>
                ) : (
                  <span className="text-white/70">Candidatures closes</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
