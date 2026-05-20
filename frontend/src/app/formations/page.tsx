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

export default async function FormationsPage() {
  const formations = await getFormations()
  if (!formations.length) return <div className="pt-32 text-center text-stone-600">Aucune formation pour le moment.</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-4 animate-fade-in">Nos Formations</h1>
        <p className="text-center text-stone-600 mb-12 animate-fade-in delay-100">Des parcours d'excellence pour votre avenir</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((f, i) => (
            <div key={f._id} className="card-glass p-6 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              {f.imageUrl && <img src={f.imageUrl} className="w-full h-48 object-cover rounded-lg mb-4" />}
              <h2 className="text-xl font-bold text-stone-800 mb-2">{f.title}</h2>
              <p className="text-stone-600 mb-4">{f.description?.substring(0, 100)}...</p>
              <div className="flex justify-between text-sm text-stone-500 mb-4">
                <span>â±ï¸ {f.duration || '3 ans'}</span>
                <span>ðŸ’° {f.price || 'Sur devis'}</span>
              </div>
              <Link href={`/formations/${f.slug || f._id}`} className="btn-modern btn-primary inline-block w-full text-center">
                En savoir plus
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}