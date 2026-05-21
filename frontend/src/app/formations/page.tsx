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
  if (!formations.length) return <div className="pt-24 text-center">Aucune formation pour le moment.</div>
  return (
    <div className="pt-24 pb-12 px-4 " style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-12 animate-fade-in">Nos Formations</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((f, idx) => (
            <div key={f._id} className="card-light animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              {f.imageUrl && <img src={f.imageUrl} className="w-full h-48 object-cover rounded-lg mb-4" />}
              <h2 className="text-2xl font-bold text-stone-800 mb-2">{f.title}</h2>
              <p className="text-stone-700 mb-4">{f.description?.substring(0, 100)}...</p>
              <div className="flex justify-between text-stone-600 text-sm mb-4">
                <span>âÂÂ±ïÂ¸Â {f.duration || '3 ans'}</span>
                <span>Ã°Å¸â€™Â° {f.price || 'Sur devis'}</span>
              </div>
              <Link href={`/formations/${f.slug || f._id}`} className="inline-block bg-[#772a1d] text-white px-4 py-2 rounded-full hover:bg-[#5c2016] transition text-center">
                En savoir plus
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}