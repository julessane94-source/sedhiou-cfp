import { client } from '@/lib/sanity/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getSiteSettings() {
  try {
    const query = `*[_type == "siteSettings"][0]{
      facebookUrl, instagramUrl, linkedinUrl, twitterUrl, whatsappNumber
    }`
    return await client.fetch(query)
  } catch (e) { return null }
}

export default async function Footer() {
  const social = await getSiteSettings()
  const icons = [
    {
      href: social?.facebookUrl,
      label: 'Facebook',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22 12a10 10 0 10-11.5 9.9v-7H8.3v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3v1.6h2.2l-.4 2.9h-1.8V22A10 10 0 0022 12" />
        </svg>
      )
    },
    {
      href: social?.instagramUrl,
      label: 'Instagram',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zm4.9-.4a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
        </svg>
      )
    },
    {
      href: social?.linkedinUrl,
      label: 'LinkedIn',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M4.98 3.5A2.5 2.5 0 007.5 1h9A2.5 2.5 0 0119 3.5v17A2.5 2.5 0 0116.5 23h-9A2.5 2.5 0 015 20.5v-17zm4.2 15.5H9.7V9.75h-.5V19h-.98V9.75h-.5V7.75h1.48V7.1c0-1.1.73-1.7 1.7-1.7.42 0 .78.03.88.05v1.02h-.6c-.5 0-.6.24-.6.58v.93h1.2l-.16 1.25h-1.04V19zM7 8.5a.75.75 0 110-1.5.75.75 0 010 1.5zm11 10.5V15.25c0-1.97-1.05-2.88-2.45-2.88-1.1 0-1.58.6-1.85 1.02v-1.03H12V19h1.2v-3.1c0-.78.15-1.56 1.1-1.56.94 0 1.04.93 1.04 1.53V19H19z" />
        </svg>
      )
    },
    {
      href: social?.twitterUrl,
      label: 'Twitter',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22 6.1c-.8.35-1.6.58-2.5.68a4.4 4.4 0 001.96-2.45 8.8 8.8 0 01-2.8 1.08 4.39 4.39 0 00-7.5 4c-3.6-.18-6.78-1.9-8.9-4.5a4.36 4.36 0 00-.6 2.2 4.4 4.4 0 001.95 3.65 4.4 4.4 0 01-2-.55v.06a4.4 4.4 0 003.52 4.3 4.4 4.4 0 01-1.98.07 4.39 4.39 0 004.1 3.05A8.82 8.82 0 012 19.54a12.4 12.4 0 006.7 1.96c8 0 12.38-6.64 12.38-12.4v-.56A8.88 8.88 0 0022 6.1z" />
        </svg>
      )
    },
    {
      href: social?.whatsappNumber ? `https://wa.me/${social.whatsappNumber}` : undefined,
      label: 'WhatsApp',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M16.7 13.7c-.2-.1-1.1-.5-1.3-.6-.2-.1-.4-.1-.6.1-.2.2-.8.6-1 1-0.2.1-0.4.1-0.7 0.1s-0.5-.1-0.8-.4c-0.4-0.4-1.3-1.4-1.3-3.1s1.3-3.6 1.5-3.8c0.2-0.2 0.4-0.2 0.6-0.2s0.4 0 0.6 0 0.4-.1 0.6-.1c0.2-.1.6-.2 0.9-.2s0.5 0 0.7 0.1c0.2 0.1 0.6 0.3 0.9 0.7 0.3 0.4 0.5 0.9 0.5 1.1 0 0.2 0 0.4-.1 0.5s-0.3 0.4-0.5 0.6c-0.2 0.2-0.4 0.4-0.5 0.6s-0.2 0.4-0.2 0.7c0 0.3 0.1 0.7 0.4 0.9 0.3 0.3 0.9 0.7 1 0.8 0.2 0.2 0.4 0.4 0.5 0.6 0.1 0.2 0.2 0.4 0.2 0.6 0 0.2 0 0.3-.1 0.5s-0.4 0.3-0.7 0.4c-0.3 0.1-1.3 0.4-2.2 0.1-0.9-0.3-1.7-1.1-2-1.4-0.3-0.3-0.6-0.6-0.7-0.8-0.1-0.2-0.3-0.3-0.3-0.4s-0.1-0.2 0-0.3c0.1-0.1 0.2-0.2 0.3-0.4 0.1-0.1 0.3-0.3 0.5-0.5s0.5-0.7 0.5-0.8c0.1-0.2 0.1-0.4 0.1-0.5s0-0.3-0.1-0.4z" />
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-[#772a1d] text-gray-100 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white">CFP SEDHIOU</h3>
            <p className="text-sm text-stone-200 mt-1">Centre de Formation Professionnelle de Sédhiou</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {icons.filter((icon) => icon.href).map((icon) => {
              let bgColor = 'bg-white/10 hover:bg-white/20';
              let textColor = 'text-white';
              
              if (icon.label === 'Facebook') {
                bgColor = 'bg-[#1877F2] hover:bg-[#165ec5]';
              } else if (icon.label === 'Instagram') {
                bgColor = 'bg-gradient-to-r from-[#FE5743] to-[#E4405F] hover:from-[#E04630] hover:to-[#D1334D]';
              } else if (icon.label === 'LinkedIn') {
                bgColor = 'bg-[#0A66C2] hover:bg-[#084a94]';
              } else if (icon.label === 'Twitter') {
                bgColor = 'bg-[#000000] hover:bg-[#1a1a1a]';
              } else if (icon.label === 'WhatsApp') {
                bgColor = 'bg-[#25D366] hover:bg-[#1ea552]';
              }
              
              return (
                <a
                  key={icon.label}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                  className={`w-11 h-11 flex items-center justify-center rounded-full ${bgColor} ${textColor} transition transform hover:scale-110`}
                  title={icon.label}
                >
                  {icon.svg}
                </a>
              );
            })}
          </div>
          <div className="text-xs text-center lg:text-right text-stone-200">© {new Date().getFullYear()} Tous droits réservés</div>
        </div>
      </div>
    </footer>
  )
}