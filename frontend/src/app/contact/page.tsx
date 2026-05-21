import { client } from '@/lib/sanity/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getContact() {
  try {
    const query = `*[_type == "contact"][0]{
      title,
      subtitle,
      address,
      phone,
      email,
      hours,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      twitterUrl,
      whatsappNumber
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error("Erreur chargement contact:", error)
    return null
  }
}

export default async function ContactPage() {
  const contact = await getContact()
  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-[#d6bfbb]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-4 animate-fade-in">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-stone-600 mb-12 animate-fade-in delay-100">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Coordonnées</h2>
            <div className="space-y-4 text-stone-700">
              <p>📍 {contact?.address}</p>
              <p>📞 {contact?.phone}</p>
              <p>✉️ {contact?.email}</p>
              <p>🕒 {contact?.hours}</p>
            </div>
            <div className="flex space-x-4 mt-6 text-2xl">
              {contact?.facebookUrl && <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900">📘</a>}
              {contact?.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900">📷</a>}
              {contact?.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900">🔗</a>}
              {contact?.twitterUrl && <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900">🐦</a>}
              {contact?.whatsappNumber && <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900">💬</a>}
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md">
            <form action="/api/contact" method="POST" className="space-y-5">
              <input type="text" name="name" placeholder="Votre nom" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#772a1d] text-stone-800" />
              <input type="email" name="email" placeholder="Votre email" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#772a1d] text-stone-800" />
              <textarea name="message" rows={5} placeholder="Votre message" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#772a1d] text-stone-800"></textarea>
              <button type="submit" className="w-full bg-[#772a1d] text-white font-semibold py-2 rounded-full hover:bg-[#5c2016] transition">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}