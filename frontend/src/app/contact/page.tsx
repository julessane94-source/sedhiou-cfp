import ChatBot from '@/components/ChatBot'
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
    <div className="pt-24 pb-20 px-4 bg-[#f7f2ef] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[#772a1d] mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900">{contact?.title || 'Contactez-nous'}</h1>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">{contact?.subtitle || 'Nous sommes lÃ  pour rÃ©pondre Ã  vos questions et vous accompagner dans votre projet de formation.'}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 shadow-xl border border-white/80">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-3">CoordonnÃ©es</h2>
                <div className="space-y-4 text-stone-700">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[#772a1d]">ðŸ“</span>
                    <p>{contact?.address || 'Adresse non renseignÃ©e'}</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[#772a1d]">ðŸ“ž</span>
                    <p>{contact?.phone || 'TÃ©lÃ©phone non renseignÃ©'}</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[#772a1d]">âœ‰ï¸</span>
                    <p>{contact?.email || 'Email non renseignÃ©'}</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[#772a1d]">ðŸ•’</span>
                    <p>{contact?.hours || 'Heures non renseignÃ©es'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-3">Nous suivre</h2>
                <div className="grid grid-cols-3 gap-3">
                  {contact?.facebookUrl && (
                    <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-3xl bg-[#1877f2] text-white p-4 hover:bg-[#145db8] transition">
                      <span className="sr-only">Facebook</span>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M22 12a10 10 0 10-11.5 9.9v-7H8.3v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3v1.6h2.2l-.4 2.9h-1.8V22A10 10 0 0022 12" />
                      </svg>
                    </a>
                  )}
                  {contact?.instagramUrl && (
                    <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4] text-white p-4 hover:opacity-90 transition">
                      <span className="sr-only">Instagram</span>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zm4.9-.4a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                      </svg>
                    </a>
                  )}
                  {contact?.linkedinUrl && (
                    <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-3xl bg-[#0a66c2] text-white p-4 hover:bg-[#084d9c] transition">
                      <span className="sr-only">LinkedIn</span>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M4.98 3.5A2.5 2.5 0 007.5 1h9A2.5 2.5 0 0119 3.5v17A2.5 2.5 0 0116.5 23h-9A2.5 2.5 0 015 20.5v-17zm4.2 15.5H9.7V9.75h-.5V19h-.98V9.75h-.5V7.75h1.48V7.1c0-1.1.73-1.7 1.7-1.7.42 0 .78.03.88.05v1.02h-.6c-.5 0-.6.24-.6.58v.93h1.2l-.16 1.25h-1.04V19zM7 8.5a.75.75 0 110-1.5.75.75 0 010 1.5zm11 10.5V15.25c0-1.97-1.05-2.88-2.45-2.88-1.1 0-1.58.6-1.85 1.02v-1.03H12V19h1.2v-3.1c0-.78.15-1.56 1.1-1.56.94 0 1.04.93 1.04 1.53V19H19z" />
                      </svg>
                    </a>
                  )}
                  {contact?.twitterUrl && (
                    <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-3xl bg-[#1da1f2] text-white p-4 hover:bg-[#1590d7] transition">
                      <span className="sr-only">Twitter</span>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M22 6.1c-.8.35-1.6.58-2.5.68a4.4 4.4 0 001.96-2.45 8.8 8.8 0 01-2.8 1.08 4.39 4.39 0 00-7.5 4c-3.6-.18-6.78-1.9-8.9-4.5a4.36 4.36 0 00-.6 2.2 4.4 4.4 0 001.95 3.65 4.4 4.4 0 01-2-.55v.06a4.4 4.4 0 003.52 4.3 4.4 4.4 0 01-1.98.07 4.39 4.39 0 004.1 3.05A8.82 8.82 0 012 19.54a12.4 12.4 0 006.7 1.96c8 0 12.38-6.64 12.38-12.4v-.56A8.88 8.88 0 0022 6.1z" />
                      </svg>
                    </a>
                  )}
                  {contact?.whatsappNumber && (
                    <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-3xl bg-[#25d366] text-white p-4 hover:bg-[#1fa44f] transition">
                      <span className="sr-only">WhatsApp</span>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M16.7 13.7c-.2-.1-1.1-.5-1.3-.6-.2-.1-.4-.1-.6.1-.2.2-.8.6-1 1-0.2.1-0.4.1-0.7 0.1s-0.5-.1-0.8-.4c-0.4-0.4-1.3-1.4-1.3-3.1s1.3-3.6 1.5-3.8c0.2-0.2 0.4-0.2 0.6-0.2s0.4 0 0.6 0 0.4-.1 0.6-.1c0.2-.1.6-.2 0.9-.2s0.5 0 0.7 0.1c0.2 0.1 0.6 0.3 0.9 0.7 0.3 0.4 0.5 0.9 0.5 1.1 0 0.2 0 0.4-.1 0.5s-0.3 0.4-0.5 0.6c-0.2 0.2-0.4 0.4-0.5 0.6s-0.2 0.4-0.2 0.7c0 0.3 0.1 0.7 0.4 0.9 0.3 0.3 0.9 0.7 1 0.8 0.2 0.2 0.4 0.4 0.5 0.6 0.1 0.2 0.2 0.4 0.2 0.6 0 0.2 0 0.3-.1 0.5s-0.4 0.3-0.7 0.4c-0.3 0.1-1.3 0.4-2.2 0.1-0.9-0.3-1.7-1.1-2-1.4-0.3-0.3-0.6-0.6-0.7-0.8-0.1-0.2-0.3-0.3-0.3-0.4s-0.1-0.2 0-0.3c0.1-0.1 0.2-0.2 0.3-0.4 0.1-0.1 0.3-0.3 0.5-0.5s0.5-0.7 0.5-0.8c0.1-0.2 0.1-0.4 0.1-0.5s0-0.3-0.1-0.4z" />
                      </svg>
                    </a>
                  )}
                </div>
                {contact?.address && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Localisation</h3>
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                      <iframe
                        title="Carte localisation"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#772a1d] rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_35%)] pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="text-3xl font-bold">Envoyez-nous un message</h2>
              <p className="max-w-xl text-stone-100">Remplissez ce formulaire et notre Ã©quipe vous rÃ©pondra rapidement.</p>
              <form action="/api/contact" method="POST" className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input type="text" name="name" placeholder="Votre nom" className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#f7d3ca]" />
                  <input type="email" name="email" placeholder="Votre email" className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#f7d3ca]" />
                </div>
                <textarea name="message" rows={6} placeholder="Votre message" className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#f7d3ca]"></textarea>
                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-white text-[#772a1d] font-semibold px-8 py-3 shadow-lg hover:bg-stone-100 transition">Envoyer le message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}