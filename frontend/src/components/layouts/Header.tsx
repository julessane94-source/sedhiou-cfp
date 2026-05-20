'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-menu shadow-lg' : 'bg-menu'}`}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white drop-shadow-md hover:opacity-90">CFP SEDHIOU</Link>
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li><Link href="/" className="hover:text-bgPage transition">Accueil</Link></li>
          <li><Link href="/formations" className="hover:text-bgPage transition">Formations</Link></li>
          <li><Link href="/actualites" className="hover:text-bgPage transition">Actualités</Link></li>
          <li><Link href="/appels-candidatures" className="hover:text-bgPage transition">Appels</Link></li>
          <li><Link href="/a-propos" className="hover:text-bgPage transition">À propos</Link></li>
          <li><Link href="/contact" className="hover:text-bgPage transition">Contact</Link></li>
          <li><Link href="/inscription" className="bg-white text-menu px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-md">Inscription</Link></li>
        </ul>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white"><Menu size={28} /></button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-menu/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-3 animate-fade-in">
          <Link href="/" className="block text-white hover:text-bgPage">Accueil</Link>
          <Link href="/formations" className="block text-white hover:text-bgPage">Formations</Link>
          <Link href="/actualites" className="block text-white hover:text-bgPage">Actualités</Link>
          <Link href="/appels-candidatures" className="block text-white hover:text-bgPage">Appels</Link>
          <Link href="/a-propos" className="block text-white hover:text-bgPage">À propos</Link>
          <Link href="/contact" className="block text-white hover:text-bgPage">Contact</Link>
          <Link href="/inscription" className="block bg-white text-menu text-center px-4 py-2 rounded-full font-bold">Inscription</Link>
        </div>
      )}
    </header>
  )
}