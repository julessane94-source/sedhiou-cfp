import HeroBlock from './HeroBlock'
import TextWithImageBlock from './TextWithImageBlock'
import GalleryBlock from './GalleryBlock'
import CtaBlock from './CtaBlock'
import FaqBlock from './FaqBlock'
import { PortableText } from '@portabletext/react'

export default function BlockRenderer({ block }: { block: any }) {
  if (!block) return null
  const toEmbedUrl = (url: string | undefined) => {
    if (!url) return url
    try {
      const u = new URL(url)
      // youtu.be short link
      if (u.hostname.includes('youtu.be')) {
        const id = u.pathname.slice(1)
        return `https://www.youtube.com/embed/${id}`
      }
      // youtube watch?v= link
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v')
        if (v) return `https://www.youtube.com/embed/${v}`
        // sometimes embed urls already
        if (u.pathname.includes('/embed/')) return url
      }
    } catch (e) {
      return url
    }
    return url
  }
  switch (block._type) {
    case 'hero':
      return <HeroBlock block={block} />
    case 'textWithImage':
      return <TextWithImageBlock block={block} />
    case 'videoBlock':
      return (
        <section className="container mx-auto px-4 py-8" key={Math.random()}>
          <h3 className="text-xl font-bold mb-4">{block.title}</h3>
          {block.url && (
            <div className="w-full max-w-4xl mx-auto">
              <iframe
                src={toEmbedUrl(block.url)}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg shadow-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
          {block.caption && <p className="text-sm text-white/70 mt-2">{block.caption}</p>}
        </section>
      )
    case 'gallery':
      return <GalleryBlock block={block} />
    case 'cta':
      return <CtaBlock block={block} />
    case 'featuredFormations':
    case 'featuredActualites':
      return null
    case 'faqBlock':
      return block.faqs ? <FaqBlock faqs={block.faqs} /> : null
    case 'testimonials':
      return null
    default:
      if (block._type === 'block' || Array.isArray(block)) return <div className="container mx-auto px-4 py-6"><PortableText value={block} /></div>
      return null
  }
}
