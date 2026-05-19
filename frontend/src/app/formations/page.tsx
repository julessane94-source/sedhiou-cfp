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
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold">Nos Formations</h1>
        <p className="text-gray-600 mt-4">Aucune formation disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-12">
          Nos Formations
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          Des parcours d'excellence pour vous préparer aux métiers de demain
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {formations.map((formation: any, index: number) => (
            <div key={formation._id} className="card-glass overflow-hidden group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-56 overflow-hidden relative">
                {formation.imageUrl ? (
                  <img src={formation.imageUrl} alt={formation.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                    <Award className="w-16 h-16 text-white/50" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{formation.description}</p>
                <div className="flex justify-between items-center text-sm text-green-700 font-semibold mb-5">
                  <span className="flex items-center gap-1"><Clock size={16} /> {formation.duration || '3 ans'}</span>
                  <span>{formation.price || 'Sur devis'}</span>
                </div>
                <Link href={`/formations/${formation.slug || formation._id}`} className="btn-modern btn-primary w-full inline-block text-center">
                  Explorer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}