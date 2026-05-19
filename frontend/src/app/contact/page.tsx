import { client } from '@/lib/sanity/client'
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react'

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
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-br from-bordeaux-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-bordeaux-800">{contact?.title || 'Contact'}</h1>
        <p className="text-center text-gray-600 mb-12">{contact?.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-bordeaux-800">Coordonnées</h2>
            <p><strong>Adresse :</strong> {contact?.address}</p>
            <p><strong>Tél :</strong> {contact?.phone}</p>
            <p><strong>Email :</strong> {contact?.email}</p>
            <p><strong>Horaires :</strong> {contact?.hours}</p>
            <div className="mt-4 flex space-x-4">
              {contact?.facebookUrl && <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook size={24} className="text-bordeaux-700" /></a>}
              {contact?.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={24} className="text-bordeaux-700" /></a>}
              {contact?.linkedinUrl && <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={24} className="text-bordeaux-700" /></a>}
              {contact?.twitterUrl && <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer"><Twitter size={24} className="text-bordeaux-700" /></a>}
              {contact?.whatsappNumber && <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={24} className="text-bordeaux-700" /></a>}
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <form action="/api/contact" method="POST" className="space-y-4">
              <input type="text" name="name" placeholder="Nom" className="w-full border p-2 rounded text-black" />
              <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded text-black" />
              <textarea name="message" placeholder="Message" rows="5" className="w-full border p-2 rounded text-black"></textarea>
              <button type="submit" className="bg-bordeaux-700 text-white px-4 py-2 rounded">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}