import { client } from '@/lib/sanity.client'
import Link from 'next/link'
import dynamicImport from 'next/dynamic'

const ContactFormClient = dynamicImport(() => import('./ContactForm'), { ssr: false })

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getContact() {
  const query = `*[_type == "contact"][0]{
    title,
    subtitle,
    address,
    phone,
    email,
    hours,
    mapEmbedUrl
  }`
  return await client.fetch(query)
}

export default async function ContactPage() {
  const contact = await getContact()
  function toEmbedMap(url?: string | null) {
    if (!url) return null
      try {
      // If already an embed URL, return as-is
      if (url.includes('/embed') || url.includes('output=embed')) return url
      // If the URL looks like any Google/Maps short/share link, convert to a maps.google.com embed using q= fallback
      if (url.includes('google') || url.includes('goo.gl') || url.includes('maps.app')) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`
      }
      return url
    } catch (e) {
      return url
    }
  }
  return (
    <div className="pt-32 pb-20 px-4 bg-transparent">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-white/90 mb-8">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-glass p-6">
            <h2 className="text-xl font-bold mb-4">Coordonnées</h2>
            <div className="space-y-2">
              <div>📍 {contact?.address}</div>
              <div>📞 {contact?.phone}</div>
              <div>✉️ {contact?.email}</div>
              <div>🕒 {contact?.hours?.replace(/\n/g, '<br/>')}</div>
            </div>
            {contact?.mapEmbedUrl && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Où nous trouver</h3>
                <div className="w-full h-64 rounded overflow-hidden">
                  <iframe src={toEmbedMap(contact.mapEmbedUrl)} className="w-full h-full border-0" allowFullScreen loading="lazy" />
                </div>
                <div className="mt-2 text-sm text-white/70">
                  <a href={contact.mapEmbedUrl} target="_blank" rel="noreferrer" className="underline">Ouvrir la carte dans Google Maps</a>
                </div>
              </div>
            )}
          </div>
          <div className="card-glass p-6">
            <h2 className="text-xl font-bold mb-4">Nous écrire</h2>
            {/* use client component form */}
            <div>
              {/* @ts-ignore */}
              <ContactFormClient />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ContactFormClient is imported at module top
