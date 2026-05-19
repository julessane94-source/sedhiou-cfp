import { PortableText } from '@portabletext/react'

export default function FaqBlock({ faqs }: { faqs: any[] }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details key={i} className="card-glass p-4 rounded-lg">
            <summary className="font-semibold cursor-pointer">{f.question}</summary>
            <div className="mt-3"><PortableText value={f.answer} /></div>
          </details>
        ))}
      </div>
    </section>
  )
}
