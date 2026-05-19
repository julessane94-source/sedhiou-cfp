import { client } from '@/lib/sanity/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getActualites() {
  try {
    const query = `*[_type == "actualite"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "coverImage": coverImage.asset->url
    }`
    return await client.fetch(query)
  } catch (e) {
    return []
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  if (!actualites || actualites.length === 0) return <div className="pt-32 text-center">Aucune actualité</div>
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12">Actualités</h1>
        <div className="space-y-8">
          {actualites.map((act: any) => (
            <div key={act._id} className="card-glass flex flex-col md:flex-row overflow-hidden">
              <div className="md:w-1/3 h-48 bg-green-200 flex items-center justify-center">{act.coverImage ? <img src={act.coverImage} className="w-full h-full object-cover" /> : '📰'}</div>
              <div className="p-6 md:w-2/3">
                <p className="text-sm text-green-700">{new Date(act.publishedAt).toLocaleDateString('fr-FR')}</p>
                <h2 className="text-2xl font-bold mb-2">{act.title}</h2>
                <p className="text-gray-600">{act.excerpt}</p>
                <Link href={`/actualites/${act.slug}`} className="text-green-700 font-semibold inline-block mt-4">Lire la suite →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}