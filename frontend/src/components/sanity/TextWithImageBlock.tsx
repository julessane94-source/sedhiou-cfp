import { PortableText } from '@portabletext/react'
import urlFor from '@/lib/sanity.image'

export default function TextWithImageBlock({ block }: { block: any }) {
  const img = block.image ? urlFor(block.image).width(800).auto('format').url() : undefined
  return (
    <section className="container mx-auto px-4 py-12">
      <div className={`grid md:grid-cols-2 gap-8 items-center ${block.imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
        <div>{block.title && <h2 className="text-2xl font-bold mb-4">{block.title}</h2>} {block.text && <PortableText value={block.text} />}</div>
        {img && <div className="w-full"><img src={img} alt={block.title || ''} className="rounded-lg shadow" /></div>}
      </div>
    </section>
  )
}
