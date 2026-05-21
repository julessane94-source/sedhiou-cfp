'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#772a1d]/90 backdrop-blur-md shadow-lg' : 'bg-[#772a1d]'}`}>
      <nav className="container mx-auto px-4 py-2 md:py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white drop-shadow-md hover:opacity-90 transition">CFP SEDHIOU</Link>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8 text-white font-medium">
          <li><Link href="/" className="hover:text-amber-300 transition duration-200">Accueil</Link></li>
          <li><Link href="/formations" className="hover:text-amber-300 transition">Formations</Link></li>
          <li><Link href="/actualites" className="hover:text-amber-300 transition">Actualités</Link></li>
          <li><Link href="/appels-candidatures" className="hover:text-amber-300 transition">Appels</Link></li>
          <li><Link href="/a-propos" className="hover:text-amber-300 transition">À propos</Link></li>
          <li><Link href="/contact" className="hover:text-amber-300 transition">Contact</Link></li>
          <li><Link href="/inscription" className="bg-white text-[#772a1d] px-4 py-1.5 rounded-full font-bold hover:bg-gray-100 transition shadow-md">Inscription</Link></li>
        </ul>

        {/* Mobile button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#772a1d]/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-2 animate-fade-in">
          <Link href="/" className="block text-white hover:text-amber-300 py-2" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link href="/formations" className="block text-white hover:text-amber-300 py-2" onClick={() => setIsOpen(false)}>Formations</Link>
          <Link href="/actualites" className="block text-white hover:text-amber-300 py-2" onClick={() => setIsOpen(false)}>Actualités</Link>
          <Link href="/appels-candidatures" className="block text-white hover:text-amber-300 py-2" onClick={() => setIsOpen(false)}>Appels</Link>
          <Link href="/a-propos" className="block text-white hover:text-amber-300 py-2" onClick={() => setIsOpen(false)}>À propos</Link>
          <Link href="/contact" className="block text-white hover:text-amber-300 py-2" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/inscription" className="block bg-white text-[#772a1d] text-center px-4 py-2 rounded-full font-bold">Inscription</Link>
        </div>
      )}
    </header>
  )
}