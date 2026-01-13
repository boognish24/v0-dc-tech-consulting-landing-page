"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface Logo {
  src: string
  alt: string
}

interface LogoCarouselSeamlessProps {
  logos: Logo[]
  speed?: number // pixels per second
}

export default function LogoCarouselSeamless({ logos, speed = 50 }: LogoCarouselSeamlessProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [setWidth, setSetWidth] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!trackRef.current) return

    // Measure the width of one complete set of logos
    const track = trackRef.current
    const children = track.children
    const singleSetCount = logos.length

    let width = 0
    for (let i = 0; i < singleSetCount; i++) {
      const child = children[i] as HTMLElement
      if (child) {
        width += child.offsetWidth
      }
    }

    // Add gaps (gap-16 = 4rem = 64px)
    const gap = 64
    width += gap * singleSetCount

    setSetWidth(width)
    setDuration(width / speed)
  }, [logos.length, speed])

  // Triple the logos to ensure seamless coverage
  const tripleLogos = [...logos, ...logos, ...logos]

  return (
    <div className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-16 whitespace-nowrap"
        style={{
          animation: duration > 0 ? `scroll-seamless ${duration}s linear infinite` : "none",
        }}
      >
        {tripleLogos.map((logo, i) => (
          <Image
            key={i}
            src={logo.src || "/placeholder.svg"}
            alt={logo.alt}
            width={120}
            height={60}
            loading="lazy"
            unoptimized
            className="inline-block h-[60px] w-auto object-contain flex-shrink-0"
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${setWidth}px);
          }
        }
      `}</style>
    </div>
  )
}
