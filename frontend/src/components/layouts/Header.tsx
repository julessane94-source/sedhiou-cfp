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
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brown-800/95 backdrop-blur-lg shadow-lg' : 'bg-brown-800/80 backdrop-blur-sm'}`}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white drop-shadow-md transition hover:scale-105">
          CFP SEDHIOU
        </Link>
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li><Link href="/" className="hover:text-bordeaux-300 transition duration-300">Accueil</Link></li>
          <li><Link href="/formations" className="hover:text-bordeaux-300 transition duration-300">Formations</Link></li>
          <li><Link href="/actualites" className="hover:text-bordeaux-300 transition duration-300">Actualités</Link></li>
          <li><Link href="/appels-candidatures" className="hover:text-bordeaux-300 transition duration-300">Appels</Link></li>
          <li><Link href="/a-propos" className="hover:text-bordeaux-300 transition duration-300">À propos</Link></li>
          <li><Link href="/contact" className="hover:text-bordeaux-300 transition duration-300">Contact</Link></li>
          <li><Link href="/inscription" className="bg-bordeaux-600 text-white px-5 py-2 rounded-full font-bold hover:bg-bordeaux-700 transition shadow-md">Inscription</Link></li>
        </ul>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-brown-800/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-3 animate-fade-in">
          <Link href="/" className="block text-white hover:text-bordeaux-300 transition" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link href="/formations" className="block text-white hover:text-bordeaux-300 transition" onClick={() => setIsOpen(false)}>Formations</Link>
          <Link href="/actualites" className="block text-white hover:text-bordeaux-300 transition" onClick={() => setIsOpen(false)}>Actualités</Link>
          <Link href="/appels-candidatures" className="block text-white hover:text-bordeaux-300 transition" onClick={() => setIsOpen(false)}>Appels</Link>
          <Link href="/a-propos" className="block text-white hover:text-bordeaux-300 transition" onClick={() => setIsOpen(false)}>À propos</Link>
          <Link href="/contact" className="block text-white hover:text-bordeaux-300 transition" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/inscription" className="block bg-bordeaux-600 text-white text-center px-4 py-2 rounded-full font-bold" onClick={() => setIsOpen(false)}>Inscription</Link>
        </div>
      )}
    </header>
  )
}