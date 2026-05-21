import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

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
  } catch (error) {
    return null
  }
}

export default async function AppelDetailPage({ params }: { params: { slug: string } }) {
  const appel = await getAppel(params.slug)
  if (!appel) notFound()
  const isOpen = appel.status === 'open' && new Date(appel.deadline) > new Date()
  return (
    <div className="pt-24 pb-12 px-4 min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto max-w-4xl">
        <Link href="/appels-candidatures" className="text-[#772a1d] hover:underline inline-block mb-4">&larr; Retour</Link>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">{appel.title}</h1>
          <p className="text-stone-700 mb-4">{appel.description}</p>
          <p className="text-stone-500 text-sm mb-2">📅 Date limite : {new Date(appel.deadline).toLocaleDateString()}</p>
          <p className={`font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>{isOpen ? '✅ Ouvert' : '❌ Fermé'}</p>
        </div>
        {isOpen && appel.googleFormUrl && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Formulaire de candidature</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <iframe src={appel.googleFormUrl} width="100%" height="800" frameBorder="0" title="Google Form" className="rounded-lg"></iframe>
            </div>
          </div>
        )}
        {!isOpen && (
          <div className="mt-8 text-center p-6 bg-red-50 rounded-xl">
            <p className="text-red-700">Les candidatures sont closes pour cette formation.</p>
          </div>
        )}
      </div>
    </div>
  )
}