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
        className="w-full flex justify-between items-center p-6 text-left text-white font-bold text-xl transition"
        style={{ backgroundColor: buttonColor }}
      >
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
          {image && (
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-[#772a1d]">
                <img src={image} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <div className="md:w-2/3">
            <div className="prose prose-stone max-w-none"><PortableText value={content} /></div>
            {signature && <p className="mt-4 italic text-stone-600">{signature}</p>}
          </div>
        </div>
      )}
    </div>
  )
}