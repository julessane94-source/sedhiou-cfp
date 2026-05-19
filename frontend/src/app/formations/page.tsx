import { client } from '@/lib/sanity.client'
import Link from 'next/link'
import { Clock, Award } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getFormations() {
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
}

export default async function FormationsPage() {
  const formations = await getFormations()

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto">
        <h1 className="section-title text-5xl font-extrabold text-center bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
          Nos Formations
        </h1>
        <p className="text-center text-white/90 max-w-2xl mx-auto mb-16 animate-fade-in">
          Des parcours d'excellence pour vous préparer aux métiers de demain
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {formations.map((formation, index) => (
            <div key={formation._id} className="card-glass overflow-hidden group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-56 overflow-hidden relative">
                {formation.imageUrl ? (
                  <img src={formation.imageUrl} alt={formation.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-transparent flex items-center justify-center">
                    <Award className="w-16 h-16 text-white/50" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{formation.title}</h3>
                <p className="text-white mb-4 line-clamp-3">{formation.description}</p>
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

