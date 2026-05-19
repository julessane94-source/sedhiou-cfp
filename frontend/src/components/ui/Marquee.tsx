'use client'
import { useEffect, useRef } from 'react'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function Marquee({ items, speed = 30, direction = 'left', className = '' }: MarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    let animationId: number
    let scrollPos = 0

    const animate = () => {
      if (direction === 'left') {
        scrollPos += 1
        if (scrollPos >= scroller.scrollWidth / 2) scrollPos = 0
      } else {
        scrollPos -= 1
        if (scrollPos <= 0) scrollPos = scroller.scrollWidth / 2
      }
      scroller.style.transform = `translateX(-${scrollPos}px)`
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [direction, speed])

  // Double les items pour un défilement continu
  const doubledItems = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap relative ${className}`}>
      <div ref={scrollerRef} className="inline-block transition-transform duration-0">
        {doubledItems.map((item, idx) => (
          <span key={idx} className="mx-8 text-lg font-medium text-white/90">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
