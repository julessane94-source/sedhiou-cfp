import urlFor from '@/lib/sanity.image'

export default function GalleryBlock({ block }: { block: any }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h3 className="text-xl font-bold mb-4">{block.title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{block.images?.map((img: any, i: number) => {
        const src = img ? urlFor(img).width(800).height(600).auto('format').url() : undefined
        return <img key={i} src={src} alt={block.title || ''} className="w-full h-48 object-cover rounded" />
      })}</div>
    </section>
  )
}
