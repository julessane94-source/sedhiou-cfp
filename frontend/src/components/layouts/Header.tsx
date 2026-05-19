 'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, PhoneIcon } from '@/components/ui/SocialIcons'
import { client } from '@/lib/sanity.client'

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/formations', label: 'Formations' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/appels-candidatures', label: 'Appels' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [social, setSocial] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let mounted = true
    async function fetchSocial() {
      try {
        const query = `*[_type == "siteSettings"][0]{facebookUrl,instagramUrl,linkedinUrl,twitterUrl,whatsappNumber,phone}`
        const res = await client.fetch(query)
        if (mounted) setSocial(res)
      } catch (e) {
        // silent
      }
    }
    fetchSocial()
    return () => { mounted = false }
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#6b3e26]/95 backdrop-blur-md shadow text-white' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" fill="white" />
            </svg>
          </span>
          <span className="text-lg font-extrabold text-green-900">CFP SEDHIOU</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={`relative px-1 py-1 font-medium ${pathname === n.href ? 'text-[#f5e6dd]' : 'text-white/90'} hover:text-[#f5e6dd] transition`}>
                {n.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#8b4b2b] to-[#6b3e26] rounded-full transition-all ${pathname === n.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            </li>
          ))}
          <li>
            <Link href="/inscription" className="btn-modern btn-primary">Inscription</Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {social?.facebookUrl && (
            <a href={social.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-green-700 hover:scale-105 transition"><FacebookIcon className="w-4 h-4" /></a>
          )}
          {social?.instagramUrl && (
            <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-pink-500 hover:scale-105 transition"><InstagramIcon className="w-4 h-4" /></a>
          )}
          {social?.linkedinUrl && (
            <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-blue-600 hover:scale-105 transition"><LinkedinIcon className="w-4 h-4" /></a>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-[#6b3e26]/95 backdrop-blur-md px-4 pt-4 pb-6 space-y-3 animate-slide-in-right">
          <div className="flex flex-col gap-2">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="block text-white py-2 px-3 rounded-lg hover:bg-[#7a462e] transition" onClick={() => setIsOpen(false)}>{n.label}</Link>
            ))}
            <Link href="/inscription" className="block bg-gradient-to-r from-[#8b4b2b] to-[#6b3e26] text-white text-center px-4 py-2 rounded-full font-bold" onClick={() => setIsOpen(false)}>Inscription</Link>
          </div>
          <div className="pt-2 border-t border-white/20 flex items-center gap-3">
            {social?.facebookUrl && (
              <a href={social.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white"><FacebookIcon className="w-5 h-5" /></a>
            )}
            {social?.instagramUrl && (
              <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white"><InstagramIcon className="w-5 h-5" /></a>
            )}
            {social?.linkedinUrl && (
              <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white"><LinkedinIcon className="w-5 h-5" /></a>
            )}
            {social?.whatsappNumber && (
              <a href={`https://wa.me/${social.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white"><PhoneIcon className="w-5 h-5" /></a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

