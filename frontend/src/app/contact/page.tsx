import { client } from '@/lib/sanity/client'
import ContactForm from './ContactForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function toEmbedMap(url: string | null | undefined): string {
  if (!url) return 'https://www.google.com/maps/embed?pb=...'
  return url
}

async function getContact() {
  try {
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
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function ContactPage() {
  const contact = await getContact()

  if (!contact) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-gray-600 mt-4">Informations de contact non disponibles.</p>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-4">{contact.title}</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{contact.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Nos coordonnées</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold">Adresse</p>
                  <p className="text-gray-600">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-semibold">Téléphone</p>
                  <p className="text-gray-600">{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🕒</span>
                <div>
                  <p className="font-semibold">Horaires</p>
                  <p className="text-gray-600 whitespace-pre-line">{contact.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
        </div>

        {contact.mapEmbedUrl && (
          <div className="mt-12 card-glass p-4">
            <h3 className="font-semibold mb-2">Où nous trouver</h3>
            <div className="w-full h-64 rounded overflow-hidden">
              <iframe
                src={toEmbedMap(contact.mapEmbedUrl)}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Carte Google Maps"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}