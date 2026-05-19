import { client } from '@/lib/sanity.client'
import BlockRenderer from '@/components/sanity/BlockRenderer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAccueil() {
  const query = `*[_type == "accueil"][0]{
    title,
    blocks,
    footerCta
  }`
  return await client.fetch(query)
}

function renderBlock(block: any) {
  if (!block) return null
  switch (block._type) {
    case 'hero':
      return (
        <section key={Math.random()} className="relative h-[60vh] md:h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: block.backgroundImage ? `url(${block.backgroundImage.asset?.url})` : undefined }}>
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md mb-4">{block.title}</h1>
            <p className="text-lg md:text-2xl text-white mb-6">{block.subtitle}</p>
            {block.buttonLink && <Link href={block.buttonLink} className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition">{block.buttonText || 'En savoir'} <ArrowRight size={16} /></Link>}
          </div>
        </section>
      )
    case 'textWithImage':
      return (
        <section key={Math.random()} className="container mx-auto px-4 py-12">
          <div className={`grid md:grid-cols-2 gap-8 items-center ${block.imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
            <div>{block.title && <h2 className="text-2xl font-bold mb-4">{block.title}</h2>} {block.text && <PortableText value={block.text} />}</div>
            {block.image && <div className="w-full"><img src={block.image.asset?.url} alt={block.title || ''} className="rounded-lg shadow" /></div>}
          </div>
        </section>
      )
    case 'videoBlock':
      return (
        <section key={Math.random()} className="container mx-auto px-4 py-8">
          <h3 className="text-xl font-bold mb-4">{block.title}</h3>
          {block.url && <div className="aspect-video"><iframe src={block.url} className="w-full h-full" /></div>}
          {block.caption && <p className="text-sm text-white/70 mt-2">{block.caption}</p>}
        </section>
      )
    case 'gallery':
      return (
        <section key={Math.random()} className="container mx-auto px-4 py-8">
          <h3 className="text-xl font-bold mb-4">{block.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{block.images?.map((img: any, i: number) => <img key={i} src={img.asset?.url} alt={block.title || ''} className="w-full h-48 object-cover rounded" />)}</div>
        </section>
      )
    case 'cta':
      return (
        <section key={Math.random()} className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block card-glass p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">{block.title}</h3>
            <p className="mb-4">{block.subtitle}</p>
            {block.buttonLink && <Link href={block.buttonLink} className="btn-modern btn-primary">{block.buttonText || 'Action'}</Link>}
          </div>
        </section>
      )
    default:
      if (block._type === 'block' || Array.isArray(block)) return <div key={Math.random()} className="container mx-auto px-4 py-6"><PortableText value={block} /></div>
      return null
  }
}

export default async function HomePage() {
  const data = await getAccueil()
  if (!data) return <div className="p-8">Chargement...</div>

  return (
    <div>
      {data.blocks?.map((b: any, i: number) => <div key={i}><BlockRenderer block={b} /></div>)}
      {data.footerCta && (
        <div className="container mx-auto px-4 py-12 text-center">
          <Link href={data.footerCta.link || '/inscription'} className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">{data.footerCta.text || "S'inscrire"} <ArrowRight size={16} /></Link>
        </div>
      )}
    </div>
  )
}
