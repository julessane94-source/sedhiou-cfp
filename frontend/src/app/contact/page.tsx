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
    <div className="pt-24 pb-12 px-4  bg-gradient-to-br from-stone-100 to-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-800 mb-4">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-stone-600 mb-12">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="card-light">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">CoordonnÃƒÂ©es</h2>
            <div className="space-y-4 text-stone-700">
              <p>Ã°Å¸â€œÂ {contact?.address}</p>
              <p>Ã°Å¸â€œÅ¾ {contact?.phone}</p>
              <p>Ã¢Å“â€°Ã¯Â¸Â {contact?.email}</p>
              <p>Ã°Å¸â€¢â€™ {contact?.hours}</p>
            </div>
            <div className="flex space-x-4 mt-6">
              {contact?.facebookUrl && <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900 text-2xl">Ã°Å¸â€œËœ</a>}
              {contact?.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900 text-2xl">Ã°Å¸â€œÂ·</a>}
              {contact?.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900 text-2xl">Ã°Å¸â€â€”</a>}
              {contact?.twitterUrl && <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900 text-2xl">Ã°Å¸ÂÂ¦</a>}
              {contact?.whatsappNumber && <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:text-stone-900 text-2xl">Ã°Å¸â€™Â¬</a>}
            </div>
          </div>
          <div className="card-light">
            <form action="/api/contact" method="POST" className="space-y-5">
              <input type="text" name="name" placeholder="Votre nom" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-800" />
              <input type="email" name="email" placeholder="Votre email" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-800" />
              <textarea name="message" rows={5} placeholder="Votre message" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-800"></textarea>
              <button type="submit" className="btn-modern btn-primary w-full">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}