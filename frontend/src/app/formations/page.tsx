import { client } from '@/lib/sanity/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFormations() {
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
    return []
  }
}

export default async function FormationsPage() {
  const formations = await getFormations()
  if (!formations.length) {
    return <div className="pt-32 text-center">Aucune formation</div>
  }
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-red-50 to-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Nos Formations</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {formations.map((f) => (
            <div key={f._id} className="bg-white rounded-xl shadow-md p-6">
              {f.imageUrl && <img src={f.imageUrl} className="w-full h-48 object-cover rounded mb-4" />}
              <h2 className="text-xl font-bold mb-2">{f.title}</h2>
              <p className="text-gray-600 mb-4">{f.description?.substring(0, 100)}...</p>
              <Link href={`/formations/${f.slug || f._id}`} className="text-red-700 font-semibold hover:underline">En savoir plus</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}