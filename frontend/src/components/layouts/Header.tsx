'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { client } from '@/lib/sanity/client'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoUrl, setLogoUrl] = useState(null)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const query = `*[_type == "siteSettings"][0]{ "logoUrl": logo.asset->url }`
        const data = await client.fetch(query)
        if (data?.logoUrl) setLogoUrl(data.logoUrl)
      } catch (e) { console.error(e) }
    }
    fetchLogo()
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#772a1d]/90 backdrop-blur-lg shadow-lg' : 'bg-[#772a1d]'}`}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="CFP SEDHIOU" className="h-10 w-auto" />
          ) : (
            <span className="text-2xl font-bold text-white">CFP SEDHIOU</span>
          )}
        </Link>
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li><Link href="/" className="hover:text-amber-300 transition">Accueil</Link></li>
          <li><Link href="/formations" className="hover:text-amber-300 transition">Formations</Link></li>
          <li><Link href="/actualites" className="hover:text-amber-300 transition">Actualités</Link></li>
          <li><Link href="/appels-candidatures" className="hover:text-amber-300 transition">Appels</Link></li>
          <li><Link href="/a-propos" className="hover:text-amber-300 transition">À propos</Link></li>
          <li><Link href="/contact" className="hover:text-amber-300 transition">Contact</Link></li>
          <li><Link href="/inscription" className="bg-white text-[#772a1d] px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-md">Inscription</Link></li>
        </ul>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white"><Menu size={28} /></button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-[#772a1d]/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-3">
          <Link href="/" className="block text-white hover:text-amber-300">Accueil</Link>
          <Link href="/formations" className="block text-white hover:text-amber-300">Formations</Link>
          <Link href="/actualites" className="block text-white hover:text-amber-300">Actualités</Link>
          <Link href="/appels-candidatures" className="block text-white hover:text-amber-300">Appels</Link>
          <Link href="/a-propos" className="block text-white hover:text-amber-300">À propos</Link>
          <Link href="/contact" className="block text-white hover:text-amber-300">Contact</Link>
          <Link href="/inscription" className="block bg-white text-[#772a1d] text-center px-4 py-2 rounded-full font-bold">Inscription</Link>
        </div>
      )}
    </header>
  )
}