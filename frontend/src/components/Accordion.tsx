'use client'

import { PortableText } from '@portabletext/react'
import { useState } from 'react'

interface AccordionProps {
  title: string
  content: any
  image?: string
  signature?: string
  buttonColor?: string
}

export default function Accordion({ title, content, image, signature, buttonColor = '#772a1d' }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left text-white font-bold text-xl transition hover:opacity-90"
        style={{ backgroundColor: buttonColor }}
      >
        <div className="flex items-center gap-4">
          {image && (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img src={image} className="w-full h-full object-cover" />
            </div>
          )}
          <span>{title}</span>
        </div>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="p-6">
          {image && (
            <div className="md:hidden flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-[#772a1d]">
                <img src={image} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <div className="prose prose-stone max-w-none"><PortableText value={content} /></div>
          {signature && <p className="mt-4 italic text-stone-600">{signature}</p>}
        </div>
      )}
    </div>
  )
}