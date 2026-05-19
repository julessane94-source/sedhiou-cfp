
import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from '@/components/ui/SocialIcons'

export const dynamic = 'force-dynamic'

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    twitterUrl,
    whatsappNumber
  }`
  return await client.fetch(query)
}

export default async function Footer() {
  const social = await getSiteSettings()

  return (
    <footer className="bg-green-900 text-green-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">CFP SEDHIOU</h3>
            <p className="text-sm">Centre de Formation Professionnelle de Sédhiou – Excellence et insertion.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Liens rapides</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/formations" className="hover:text-white transition">Formations</Link></li>
              <li><Link href="/inscription" className="hover:text-white transition">Inscription</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Suivez-nous</h4>
            <div className="flex items-center gap-3">
              {social?.facebookUrl && (
                <a href={social.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-105 transition"><FacebookIcon className="w-5 h-5 text-blue-600" /></a>
              )}
              {social?.instagramUrl && (
                <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-105 transition"><InstagramIcon className="w-5 h-5 text-pink-500" /></a>
              )}
              {social?.linkedinUrl && (
                <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-105 transition"><LinkedinIcon className="w-5 h-5 text-blue-700" /></a>
              )}
              {social?.twitterUrl && (
                <a href={social.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-105 transition"><TwitterIcon className="w-5 h-5 text-sky-500" /></a>
              )}
              {social?.whatsappNumber && (
                <a href={`https://wa.me/${social.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-105 transition"><WhatsappIcon className="w-5 h-5 text-green-600" /></a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-green-800 mt-6 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} CFP SEDHIOU – Tous droits réservés
        </div>
      </div>
    </footer>
  )
}

