import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAppel(slug: string) {
  try {
    const query = `*[_type == "appelCandidature" && slug.current == $slug][0]{
      title,
      description,
      deadline,
      status,
      googleFormUrl
    }`
    return await client.fetch(query, { slug })
  } catch (e) {
    return null
  }
}

export default async function AppelDetailPage({ params }: { params: { slug: string } }) {
  const appel = await getAppel(params.slug)
  if (!appel) notFound()
  const isOpen = appel.status === 'open' && new Date(appel.deadline) > new Date()
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <Link href="/appels-candidatures" className="text-green-700 hover:underline inline-block mb-4">&larr; Retour</Link>
        <div className="card-glass p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">{appel.title}</h1>
          <p className="text-gray-700 mb-4">{appel.description}</p>
          <p className="text-sm text-gray-500 mb-2">📅 Date limite : {new Date(appel.deadline).toLocaleDateString('fr-FR')}</p>
          <p className={`text-sm font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
            Statut : {isOpen ? 'Ouvert' : 'Clos'}
          </p>
        </div>
        {isOpen && appel.googleFormUrl && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Formulaire de candidature</h2>
            <div className="card-glass p-4">
              <iframe src={appel.googleFormUrl} width="100%" height="800" frameBorder="0" title="Google Form" className="rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}