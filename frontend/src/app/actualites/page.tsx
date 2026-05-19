import { client } from '@/lib/sanity.client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getActualites() {
  const query = `*[_type == "actualite"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    publishedAt,
    "slug": slug.current,
    "coverImage": coverImage.asset->url
  }`
  return await client.fetch(query)
}

export default async function ActualitesPage() {
  const actualites = await getActualites()

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto">
        <h1 className="section-title text-5xl font-extrabold text-center bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
          Actualités
        </h1>
        <p className="text-center text-white/90 max-w-2xl mx-auto mb-16 animate-fade-in">
          Toute l'actualité du CFP SEDHIOU
        </p>
        <div className="space-y-8">
          {actualites.map((act, index) => (
            <article key={act._id} className="card-glass overflow-hidden md:flex animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="md:w-1/3 h-48 md:h-auto bg-transparent flex items-center justify-center">
                {act.coverImage ? <img src={act.coverImage} className="w-full h-full object-cover" /> : '📰'}
              </div>
              <div className="p-6 md:w-2/3">
                <p className="text-sm text-green-700 mb-1">{new Date(act.publishedAt).toLocaleDateString('fr-FR')}</p>
                <h2 className="text-2xl font-bold mb-2">{act.title}</h2>
                <p className="text-white mb-4">{act.excerpt || 'Cliquez pour lire la suite...'}</p>
                <Link href={`/actualites/${act.slug || act._id}`} className="text-green-700 font-semibold hover:underline">
                  Lire la suite →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

