import { client } from '@/lib/sanity/client'
import Link from 'next/link'

interface Formation {
  _id: string
  title: string
  description: string
  duration: string
  price: string
  slug: string
  imageUrl: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFormations(): Promise<Formation[]> {
  try {
    const query = `*[_type == "formation"] | order(_createdAt desc) {
      _id,
      title,
      description,
      duration,
      price,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement formations:", error)
    return []
  }
}

// Fonction pour normaliser le slug (remplacer les espaces par des tirets)
function normalizeSlug(slug: string): string {
  return slug?.replace(/\s+/g, '-').toLowerCase() || ''
}

export default async function FormationsPage() {
  const formations = await getFormations()
  if (!formations.length) return <div className="pt-32 text-center text-white">Aucune formation pour le moment.</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">Nos Formations</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((f) => (
            <div key={f._id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition hover:-translate-y-1">
              {f.imageUrl && <img src={f.imageUrl} className="w-full h-48 object-cover rounded-lg mb-4" />}
              <h2 className="text-xl font-bold text-white mb-2">{f.title}</h2>
              <p className="text-gray-200 mb-4">{f.description?.substring(0, 100)}...</p>
              <div className="flex justify-between text-sm text-gray-300 mb-4">
                <span>⏱️ {f.duration || '3 ans'}</span>
                <span>💰 {f.price || 'Sur devis'}</span>
              </div>
              <Link href={`/formations/${normalizeSlug(f.slug)}`} className="btn-modern-black inline-block">En savoir plus</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}