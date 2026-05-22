import { client } from '@/lib/sanity/client'
import Link from 'next/link'

function formatDuration(d?: string) {
  return d || 'Durée à préciser'
}

function formatPrice(p?: string) {
  return p || 'Sur devis'
}

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
  } catch (error) { return [] }
}

export default async function FormationsPage() {
  const formations = await getFormations()
  if (!formations.length) return <div className="pt-24 text-center">Aucune formation pour le moment.</div>
  return (
    <div className="pt-24 pb-12 px-4 min-h-screen" style={{ backgroundColor: '#d6bfbb' }}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-stone-800 mb-8">Nos Formations</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((f, idx) => (
            <article key={f._id} className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              {f.imageUrl && <img src={f.imageUrl} alt={f.title} className="w-full h-44 object-cover rounded-lg mb-4" />}
              <h2 className="text-xl font-bold text-stone-800 mb-2">{f.title}</h2>
              <p className="text-stone-600 mb-3 line-clamp-3">{f.description}</p>
              <div className="flex justify-between items-center text-stone-600 text-sm mb-4">
                <span className="inline-flex items-center gap-2"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8v4l3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{formatDuration(f.duration)}</span>
                <span className="inline-flex items-center gap-2"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 1v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 11a5 5 0 11-10 0 5 5 0 0110 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{formatPrice(f.price)}</span>
              </div>
              <Link href={`/formations/${f.slug || f._id}`} className="inline-block bg-[#772a1d] text-white px-4 py-2 rounded-full text-center w-full hover:bg-[#5c2016]">En savoir plus</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}