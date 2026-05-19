import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

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
  } catch (e) { return [] }
}

export default async function FormationsPage() {
  const formations = await getFormations()
  if (!formations.length) return <div className="pt-32 text-center text-white">Aucune formation pour le moment.</div>
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 animate-fade-in">Nos Formations</h1>
        <p className="text-center text-gray-200 mb-12 animate-fade-in animation-delay-200">Des parcours d'excellence pour votre avenir</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((f, i) => (
            <div key={f._id} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              {f.imageUrl && <img src={f.imageUrl} className="w-full h-48 object-cover rounded-lg mb-4" />}
              <h2 className="text-xl font-bold text-white mb-2">{f.title}</h2>
              <p className="text-gray-200 mb-4">{f.description?.substring(0, 100)}...</p>
              <div className="flex justify-between text-sm text-gray-300 mb-4">
                <span className="flex items-center gap-1"><Clock size={14} /> {f.duration || '3 ans'}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {f.price || 'Sur devis'}</span>
              </div>
              <Link href={`/formations/${f.slug || f._id}`} className="btn-modern-black">DÃƒÂ©couvrir</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}