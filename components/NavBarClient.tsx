"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { PopupButton } from "react-calendly"

export default function NavBarClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [popupRoot, setPopupRoot] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (typeof document !== "undefined") setPopupRoot(document.body)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1A2D44]">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/dc-logo-transparent.png"
            alt="DC Tech Consulting Logo"
            width={220}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#methodology" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200">Methodology</Link>
          <Link href="#help" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200">How We Help</Link>
          <Link href="#about" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200">About</Link>
          <Link href="#testimonials" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200">Testimonials</Link>
          <Link href="#faq" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          {popupRoot && (
            <PopupButton
              url="https://calendly.com/donchester"
              rootElement={popupRoot}
              text="Let's Chat"
              className="bg-[#42C5C9] hover:bg-[#2A9B9F] text-white uppercase font-medium text-sm px-6 py-3 h-auto transition-colors duration-200 rounded-md"
            />
          )}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A2D44] border-t border-white/10 py-4">
          <div className="container flex flex-col space-y-4">
            <Link href="#methodology" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>Methodology</Link>
            <Link href="#help" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>How We Help</Link>
            <Link href="#about" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="#testimonials" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
            <Link href="#faq" className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          </div>
        </div>
      )}
    </header>
  )
}

