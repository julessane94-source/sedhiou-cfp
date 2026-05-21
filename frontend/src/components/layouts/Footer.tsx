import { client } from '@/lib/sanity/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getSiteSettings() {
  try {
    const query = `*[_type == "siteSettings"][0]{
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      twitterUrl,
      whatsappNumber
    }`
    return await client.fetch(query)
  } catch (e) { return null }
}

export default async function Footer() {
  const social = await getSiteSettings()
  return (
    <footer className="bg-[#772a1d] text-gray-100 mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white">CFP SEDHIOU</h3>
            <p className="text-xs">Centre de Formation Professionnelle de Sédhiou</p>
          </div>
          <div className="flex gap-6 text-2xl">
            {social?.facebookUrl && <a href={social.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">📘</a>}
            {social?.instagramUrl && <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">📷</a>}
            {social?.linkedinUrl && <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">🔗</a>}
            {social?.twitterUrl && <a href={social.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">🐦</a>}
            {social?.whatsappNumber && <a href={`https://wa.me/${social.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">💬</a>}
          </div>
          <div className="text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  )
}