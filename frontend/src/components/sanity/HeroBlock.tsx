import Link from 'next/link'
import urlFor from '@/lib/sanity.image'

export default function HeroBlock({ block }: { block: any }) {
  const bg = block.backgroundImage ? urlFor(block.backgroundImage).width(1600).auto('format').url() : undefined
  return (
    <section className="relative h-[60vh] md:h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: bg ? `url(${bg})` : undefined }}>
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md mb-4">{block.title}</h1>
        <p className="text-lg md:text-2xl text-white mb-6">{block.subtitle}</p>
        {block.buttonLink && <Link href={block.buttonLink} className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition">{block.buttonText || 'En savoir'} </Link>}
      </div>
    </section>
  )
}
