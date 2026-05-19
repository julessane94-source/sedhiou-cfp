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
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function FormationsPage() {
  const formations = await getFormations()
  if (!formations.length) return <div className="pt-32 text-center">Aucune formation</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Nos Formations</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {formations.map((f) => (
            <div key={f._id} className="card-glass p-6">
              {f.imageUrl && <img src={f.imageUrl} className="w-full h-48 object-cover rounded mb-4" />}
              <h2 className="text-xl font-bold mb-2">{f.title}</h2>
              <p className="text-white/80 mb-4">{f.description?.substring(0, 100)}...</p>
              <Link href={`/formations/${f.slug || f._id}`} className="text-white font-semibold hover:underline">En savoir plus</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}