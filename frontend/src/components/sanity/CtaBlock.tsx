import Link from 'next/link'

export default function CtaBlock({ block }: { block: any }) {
  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <div className="inline-block card-glass p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-2">{block.title}</h3>
        <p className="mb-4">{block.subtitle}</p>
        {block.buttonLink && <Link href={block.buttonLink} className="btn-modern btn-primary">{block.buttonText || 'Action'}</Link>}
      </div>
    </section>
  )
}
