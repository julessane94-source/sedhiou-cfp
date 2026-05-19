import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react'

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
    <footer className="bg-marron-900 text-gray-200 mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div><h3 className="text-xl font-bold text-white mb-3">CFP SEDHIOU</h3><p className="text-sm">Centre de Formation Professionnelle de Sédhiou – Excellence et insertion.</p></div>
          <div><h4 className="font-semibold text-white mb-2">Liens rapides</h4><ul className="space-y-1 text-sm"><li><Link href="/formations" className="hover:text-white">Formations</Link></li><li><Link href="/inscription" className="hover:text-white">Inscription</Link></li><li><Link href="/contact" className="hover:text-white">Contact</Link></li></ul></div>
          <div><h4 className="font-semibold text-white mb-2">Suivez-nous</h4><div className="flex space-x-4">
            {social?.facebookUrl && <a href={social.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Facebook size={24} /></a>}
            {social?.instagramUrl && <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Instagram size={24} /></a>}
            {social?.linkedinUrl && <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Linkedin size={24} /></a>}
            {social?.twitterUrl && <a href={social.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Twitter size={24} /></a>}
            {social?.whatsappNumber && <a href={`https://wa.me/${social.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><MessageCircle size={24} /></a>}
          </div></div>
        </div>
        <div className="border-t border-marron-800 mt-6 pt-4 text-center text-sm">&copy; {new Date().getFullYear()} CFP SEDHIOU – Tous droits réservés</div>
      </div>
    </footer>
  )
}