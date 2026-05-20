import { client } from '@/lib/sanity/client'

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
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-gray-200 mb-12">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Coordonnées</h2>
            <div className="space-y-4 text-gray-200">
              <p>📍 {contact?.address}</p>
              <p>📞 {contact?.phone}</p>
              <p>✉️ {contact?.email}</p>
              <p>🕒 {contact?.hours}</p>
            </div>
            <div className="flex space-x-4 mt-6">
              {contact?.facebookUrl && <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer">📘</a>}
              {contact?.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">📷</a>}
              {contact?.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer">🔗</a>}
              {contact?.twitterUrl && <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer">🐦</a>}
              {contact?.whatsappNumber && <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer">💬</a>}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <form action="/api/contact" method="POST" className="space-y-5">
              <input type="text" name="name" placeholder="Votre nom" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30" />
              <input type="email" name="email" placeholder="Votre email" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30" />
              <textarea name="message" rows={5} placeholder="Votre message" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"></textarea>
              <button type="submit" className="btn-modern-black w-full">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}