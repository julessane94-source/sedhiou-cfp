import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getAppel(slug: string) {
  const query = `*[_type == "appelCandidature" && slug.current == $slug][0]{
    title,
    description,
    deadline,
    status,
    googleFormUrl
  }`
  return await client.fetch(query, { slug })
}

export default async function AppelDetailPage({ params }: { params: { slug: string } }) {
  const appel = await getAppel(params.slug)
  if (!appel) notFound()
  const isOpen = appel.status === 'open' && new Date(appel.deadline) > new Date()
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <Link href="/appels-candidatures" className="text-bordeaux-300 hover:underline inline-block mb-4">&larr; Retour</Link>
      <h1 className="text-4xl font-bold mt-4">{appel.title}</h1>
      <p>{appel.description}</p>
      <p>📅 {new Date(appel.deadline).toLocaleDateString()}</p>
      <p className={`font-semibold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>{isOpen ? 'Ouvert' : 'Clos'}</p>
      {isOpen && appel.googleFormUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Formulaire de candidature</h2>
          <iframe src={appel.googleFormUrl} width="100%" height="800" frameBorder="0" className="rounded-lg"></iframe>
        </div>
      )}
    </div>
  )
}