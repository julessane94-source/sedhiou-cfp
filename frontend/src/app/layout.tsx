import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CFP SEDHIOU - Centre de Formation Professionnelle',
  description: 'Formations professionnelles de qualité à Sédhiou',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen" animated-gradient>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

