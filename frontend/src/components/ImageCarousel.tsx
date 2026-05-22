'use client'
import { useState, useEffect } from 'react'

export default function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])
  if (!images.length) return null
  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-black">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img src={img} alt={`Carousel image ${idx + 1}`} className="w-full h-full object-contain object-center bg-black" loading="lazy" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}