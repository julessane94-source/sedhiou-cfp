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
    <footer className="bg-menu text-white mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div><h3 className="text-xl font-bold mb-3">CFP SEDHIOU</h3><p className="text-sm opacity-90">Centre de Formation Professionnelle de Sédhiou – Excellence et insertion.</p></div>
          <div><h4 className="font-semibold mb-2">Liens rapides</h4><ul className="space-y-1 text-sm opacity-90"><li><Link href="/formations" className="hover:opacity-100">Formations</Link></li><li><Link href="/inscription" className="hover:opacity-100">Inscription</Link></li><li><Link href="/contact" className="hover:opacity-100">Contact</Link></li></ul></div>
          <div><h4 className="font-semibold mb-2">Suivez-nous</h4><div className="flex space-x-4">
            {social?.facebookUrl && <a href={social.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-2xl">📘</a>}
            {social?.instagramUrl && <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-2xl">📷</a>}
            {social?.linkedinUrl && <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-2xl">🔗</a>}
            {social?.twitterUrl && <a href={social.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-2xl">🐦</a>}
            {social?.whatsappNumber && <a href={`https://wa.me/${social.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-2xl">💬</a>}
          </div></div>
        </div>
        <div className="border-t border-white/20 mt-6 pt-4 text-center text-sm opacity-70">&copy; {new Date().getFullYear()} CFP SEDHIOU – Tous droits réservés</div>
      </div>
    </footer>
  )
}