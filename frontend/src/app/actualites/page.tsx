import { client } from '@/lib/sanity/client'
import Link from 'next/link'

interface Actualite {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  slug: string
  coverImage: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getActualites(): Promise<Actualite[]> {
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
    console.error(e)
    return []
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites()
  if (!actualites.length) return <div className="pt-32 text-center">Aucune actualité</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Actualités</h1>
        <div className="space-y-8">
          {actualites.map((a) => (
            <div key={a._id} className="card-glass p-6">
              {a.coverImage && <img src={a.coverImage} className="w-full h-48 object-cover rounded mb-4" />}
              <h2 className="text-2xl font-bold">{a.title}</h2>
              <p className="text-white/70 text-sm">{new Date(a.publishedAt).toLocaleDateString()}</p>
              <p className="text-white/80 mt-2">{a.excerpt}</p>
              <Link href={`/actualites/${a.slug}`} className="text-white font-semibold hover:underline inline-block mt-2">Lire la suite →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}