import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Clock, Award } from 'lucide-react'

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
    return <div className="pt-32 pb-20 px-4 text-center"><h1>Nos Formations</h1><p>Aucune formation</p></div>
  }
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12">Nos Formations</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {formations.map((f: any, i: number) => (
            <div key={f._id} className="card-glass overflow-hidden">
              <div className="h-56 bg-green-200 flex items-center justify-center">
                {f.imageUrl ? <img src={f.imageUrl} className="w-full h-full object-cover" /> : <Award className="w-16 h-16 text-white/50" />}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 mb-4">{f.description}</p>
                <div className="flex justify-between text-sm text-green-700 mb-5">
                  <span><Clock size={16} /> {f.duration || '3 ans'}</span>
                  <span>{f.price || 'Sur devis'}</span>
                </div>
                <Link href={`/formations/${f.slug || f._id}`} className="btn-modern btn-primary w-full text-center">Explorer</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}