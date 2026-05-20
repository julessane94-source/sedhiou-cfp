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
    console.error(error)
    return null
  }
}

export default async function ContactPage() {
  const contact = await getContact()
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 animate-fade-in">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-gray-600 mb-12 animate-fade-in animation-delay-200">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="card-modern p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Coordonnées</h2>
            <div className="space-y-4 text-gray-700">
              <p>📍 {contact?.address}</p>
              <p>📞 {contact?.phone}</p>
              <p>✉️ {contact?.email}</p>
              <p>🕒 {contact?.hours}</p>
            </div>
            <div className="flex space-x-4 mt-6">
              {contact?.facebookUrl && <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-2xl">📘</a>}
              {contact?.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-2xl">📷</a>}
              {contact?.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-2xl">🔗</a>}
              {contact?.twitterUrl && <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-2xl">🐦</a>}
              {contact?.whatsappNumber && <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-2xl">💬</a>}
            </div>
          </div>
          <div className="card-modern p-8 animate-slide-up animation-delay-200">
            <form action="/api/contact" method="POST" className="space-y-5">
              <input type="text" name="name" placeholder="Votre nom" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-800" />
              <input type="email" name="email" placeholder="Votre email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-800" />
              <textarea name="message" rows={5} placeholder="Votre message" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-800"></textarea>
              <button type="submit" className="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-700 transition transform hover:-translate-y-1">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}