import Image from "next/image"

interface Logo {
  src: string
  alt: string
}

interface LogoCarouselProps {
  logos: Logo[]
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  return (
    <section className="py-10 bg-[#F5F5F5]">
      <div className="container overflow-hidden">
        <h2 className="text-center text-sm md:text-base font-medium text-[#707070] mb-8">
          My methodology has been proven at:
        </h2>

        {/* carousel with faster animation */}
        <div className="relative">
          <div className="flex gap-16 animate-scroll-faster whitespace-nowrap">
            {[...logos, ...logos].map((logo, i) => (
              <Image
                key={i}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={120}
                height={60}
                className="inline-block h-[60px] w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
