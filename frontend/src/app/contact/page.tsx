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
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-gray-600 mb-12">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">CoordonnÃ©es</h2>
            <div className="space-y-4 text-gray-700">
              <p>ðŸ“ {contact?.address}</p>
              <p>ðŸ“ž {contact?.phone}</p>
              <p>âœ‰ï¸ {contact?.email}</p>
              <p>ðŸ•’ {contact?.hours}</p>
            </div>
            <div className="flex space-x-4 mt-6">
              {contact?.facebookUrl && <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">ðŸ“˜</a>}
              {contact?.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">ðŸ“·</a>}
              {contact?.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">ðŸ”—</a>}
              {contact?.twitterUrl && <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">ðŸ¦</a>}
              {contact?.whatsappNumber && <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">ðŸ’¬</a>}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <form action="/api/contact" method="POST" className="space-y-5">
              <input type="text" name="name" placeholder="Votre nom" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500" />
              <input type="email" name="email" placeholder="Votre email" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500" />
              <textarea name="message" rows={5} placeholder="Votre message" className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"></textarea>
              <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}