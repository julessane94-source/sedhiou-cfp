import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'

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
  } catch (e) { return null }
}

export default async function ContactPage() {
  const contact = await getContact()
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 animate-fade-in">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-gray-200 mb-12 animate-fade-in animation-delay-200">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">Coordonnées</h2>
            <div className="space-y-4 text-gray-200">
              <p>📍 {contact?.address}</p>
              <p>📞 {contact?.phone}</p>
              <p>✉️ {contact?.email}</p>
              <p>🕒 {contact?.hours}</p>
            </div>
            <div className="flex space-x-4 mt-6">
              {contact?.facebookUrl && <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 text-2xl">📘</a>}
              {contact?.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 text-2xl">📷</a>}
              {contact?.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 text-2xl">🔗</a>}
              {contact?.twitterUrl && <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 text-2xl">🐦</a>}
              {contact?.whatsappNumber && <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 text-2xl">💬</a>}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 animate-slide-up animation-delay-200">
            <form action="/api/contact" method="POST" className="space-y-5">
              <input type="text" name="name" placeholder="Nom" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white" />
              <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white" />
              <textarea name="message" rows={5} placeholder="Message" className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
              <button type="submit" className="w-full bg-white text-bordeaux-800 font-bold py-2 rounded-lg hover:bg-gray-100 transition transform hover:-translate-y-1">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}