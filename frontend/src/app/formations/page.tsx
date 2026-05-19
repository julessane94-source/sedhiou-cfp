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
    console.error(e)
    return []
  }
}

export default async function FormationsPage() {
  const formations = await getFormations()
  if (!formations || formations.length === 0) {
    return <div className="pt-32 pb-20 px-4 text-center">Aucune formation disponible.</div>
  }
  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-green-800 mb-12">Nos Formations</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {formations.map((formation: any) => (
            <div key={formation._id} className="card-glass overflow-hidden group">
              <div className="h-56 overflow-hidden relative">
                {formation.imageUrl ? (
                  <img src={formation.imageUrl} alt={formation.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center"><Award className="w-16 h-16 text-white/50" /></div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
                <p className="text-gray-600 mb-4">{formation.description?.substring(0, 100)}...</p>
                <div className="flex justify-between text-sm text-green-700 font-semibold mb-5">
                  <span><Clock size={16} className="inline mr-1" />{formation.duration || '3 ans'}</span>
                  <span>{formation.price || 'Sur devis'}</span>
                </div>
                <Link href={`/formations/${formation.slug || formation._id}`} className="btn-modern btn-primary w-full inline-block text-center">Explorer</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}