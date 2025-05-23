"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, X, Calendar } from "lucide-react"
import TestimonialSection from "@/components/TestimonialSection"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Updated logos array with new 7-Eleven logo
  const logos = [
    { src: "/images/shell-logo.png", alt: "Shell Logo" },
    { src: "/images/ats-logo-new.png", alt: "Anderson Trucking Service Logo" },
    { src: "/images/ut-southwestern-logo.png", alt: "UT Southwestern Medical Center Logo" },
    { src: "/images/alliance-data-logo.png", alt: "Alliance Data Systems Logo" },
    { src: "/images/southwest-logo.png", alt: "Southwest Airlines Logo" },
    { src: "/images/comerica-logo-new.png", alt: "Comerica Logo" },
    { src: "/images/nrf-logo-new.png", alt: "National Retail Federation Logo" },
  ]

  const sixSteps = [
    {
      num: 1,
      title: "Accounts Payable Analysis",
      blurb: "Identifying Your Technology Costs & Obligations",
      color: "#7FD9DB", // Light teal
    },
    {
      num: 2,
      title: "Vendor Invoice Review",
      blurb: "Gathering Your Service Blueprint",
      color: "#5EBFD3", // Teal-blue
    },
    {
      num: 3,
      title: "Vendor Record Reconciliation",
      blurb: "Verifying Your Service Records",
      color: "#4A90E2", // Medium blue
    },
    {
      num: 4,
      title: "Usage & Capacity Analysis",
      blurb: "Optimising Your Asset Utilisation",
      color: "#3E7CB2", // Blue
    },
    {
      num: 5,
      title: "Baseline Database Development",
      blurb: "Build a Simple Tech Asset Tracker",
      color: "#2A6CB0", // Deeper blue
    },
    {
      num: 6,
      title: "Monthly Executive Reporting",
      blurb: "Transforming Data Into Strategic Decisions",
      color: "#1A5CAE", // Deep blue
    },
  ]

  // Broad capabilities section
  const broadCapabilities = [
    {
      title: "Technology Cost Assessment",
      subtitle: "Baseline all telecom & cloud spend",
      blurb: "Full visibility into every telecom, cloud & SaaS charge—before we negotiate a single dollar.",
    },
    {
      title: "Vendor Selection",
      subtitle: "Find the right partners",
      blurb: "Objective evaluation of vendors based on your specific requirements and business goals.",
    },
    {
      title: "Vendor Contract Negotiation",
      subtitle: "Leverage 30 years of benchmarks",
      blurb: "Benchmarking 30 yrs of rate data to slash costs and lock in flexible terms.",
    },
    {
      title: "Lifecycle Asset Management",
      subtitle: "Track from activation to retirement",
      blurb: "Track each circuit, license & device from activation to retirement—no more zombie services.",
    },
  ]

  // Deep domain expertise section
  const domainExpertise = [
    {
      title: "Network & Connectivity",
      subtitle: "SD-WAN, SASE, MPLS, DIA",
      blurb: "SD-WAN, SASE, MPLS, DIA—designed, sourced & optimized.",
    },
    {
      title: "UCaaS / CCaaS",
      subtitle: "Align with hybrid-work needs",
      blurb: "Align license mix and QOS with hybrid-work user behaviour.",
    },
    {
      title: "Cloud & Colocation",
      subtitle: "Right-size workloads & costs",
      blurb: "Right-size workloads, interconnects and egress to cut spend.",
    },
    {
      title: "Cybersecurity & Compliance",
      subtitle: "Zero-Trust, MDR & compliance",
      blurb: "Zero-Trust, MDR and compliance controls scoped for ROI.",
    },
  ]

  const testimonials = [
    {
      quote:
        "Don Chester and his Group drove several network-related initiatives. In one of those engagements he performed an inventory and optimization project which saved over a million dollars the first year. He also provides us an on-going inventory with a detailed analysis of telecom/network expenses, and identifies unused circuits, lines and services that are producing unnecessary cost.",
      attribution: "Senior Director – Supplier Management",
      company: "7-Eleven",
      logo: "/images/7-eleven-logo-new.png",
    },
    {
      quote:
        "Don and his company provided us with a detailed inventory and assessment of our primary vendor's main telecom bill, which averages about $50,000 per month, resulting in a net savings of over 20% to UTSW. He also monitored the cleanup of the unneeded services which resulted in additional credits of almost $40,000 for late disconnect charges.",
      attribution: "Director, Telecommunications & Networks",
      company: "UT Southwestern Medical Center",
      logo: "/images/ut-southwestern-logo.png",
    },
    {
      quote:
        "Don's methodology helped us identify over $250,000 in unnecessary technology expenses in just the first month. His systematic approach brought clarity to our complex technology landscape.",
      attribution: "IT Director",
      company: "Anderson Trucking Service",
      logo: "/images/ats-logo-new.png",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Navigation Bar */}
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
            <Link
              href="#methodology"
              className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
            >
              Methodology
            </Link>
            <Link
              href="#help"
              className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
            >
              How We Help
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="#testimonials"
              className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-[#42C5C9] hover:bg-[#2A9B9F] text-white uppercase font-medium text-sm px-6 py-3 h-auto transition-colors duration-200">
              Let's Chat
            </Button>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1A2D44] border-t border-white/10 py-4">
            <div className="container flex flex-col space-y-4">
              <Link
                href="#methodology"
                className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Methodology
              </Link>
              <Link
                href="#help"
                className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                How We Help
              </Link>
              <Link
                href="#about"
                className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#testimonials"
                className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="text-base font-medium text-white hover:text-[#7FD9DB] transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Updated Hero Section with higher positioned guide stack */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-[#1A2D44] to-[#263b57]">
          <div className="container grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-8 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Gain Clarity, Certainty & Control over Your Technology Landscape
              </h1>
              <p className="text-xl md:text-2xl text-[#7FD9DB] font-medium">
                The 6 Steps to Getting a Clear View of Your Technology Costs
              </p>
              <p className="text-gray-300 text-base leading-relaxed max-w-[65ch]">
                Over the last 30 years, I've watched companies struggle with an increasingly complex technology
                landscape. My proven methodology helps CIOs, CFOs, and IT executives gain clarity and control over their
                technology investments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-[#42C5C9] hover:bg-[#2A9B9F] text-white uppercase font-medium text-sm px-6 py-3 h-auto transition-colors duration-200">
                  Get 6 Steps
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 uppercase font-medium text-sm px-6 py-3 h-auto transition-colors duration-200"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Moved guide stack much higher to not bleed into logo carousel */}
            <div className="flex justify-center -mt-96">
              <div className="guide-stack relative w-[312px] perspective-[1200px]">
                <Image
                  src="/images/titlepage.png"
                  alt="6 Steps guide cover"
                  width={312}
                  height={420}
                  className="page page-1 absolute top-0 left-0 w-full shadow-lg rounded-md transition-transform duration-350 ease-in-out z-30"
                />
                <Image
                  src="/images/page-5.png"
                  alt="Step 2: Vendor Invoice & Contract Review"
                  width={312}
                  height={420}
                  className="page page-2 absolute top-0 left-0 w-full shadow-lg rounded-md transition-transform duration-350 ease-in-out z-20"
                />
                <Image
                  src="/images/page-7.png"
                  alt="Step 4: Usage & Capacity Analysis"
                  width={312}
                  height={420}
                  className="page page-3 absolute top-0 left-0 w-full shadow-lg rounded-md transition-transform duration-350 ease-in-out z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Logos Section with updated subtext */}
        <section className="py-10 bg-[#F5F5F5] overflow-hidden">
          <div className="container">
            <h2 className="text-center text-sm md:text-base font-medium text-[#707070] mb-8">
              Refined with collaboration from leaders at:
            </h2>
            <div className="relative overflow-hidden">
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

        {/* Updated Methodology Section with larger DC Tech logo */}
        <section id="methodology" className="py-16 md:py-24 bg-white">
          <div className="container text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-3xl font-semibold text-[#1A2D44] inline-flex items-center">
                The
                <Image
                  src="/images/dc-tech-logo-reverse.png"
                  alt="DC Tech"
                  width={160}
                  height={60}
                  className="mx-2 h-16 w-auto"
                />
                Approach
              </h2>
            </div>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto mb-12">
              A simple, 6-step approach refined over 30 years of consulting engagements to baseline, manage and optimise
              your technology contracts and obligations.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sixSteps.map((s) => (
                <article
                  key={s.num}
                  className="relative group bg-white p-6 rounded-md shadow-md border
                            hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <span
                    className="absolute -top-4 left-4 w-10 h-10 rounded-full flex items-center
                              justify-center text-white font-bold"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.num}
                  </span>
                  <h3 className="mt-6 mb-2 font-semibold text-[#1A2D44] group-hover:text-[#42C5C9] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[#707070] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {s.blurb}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Updated How Can We Help Section with side-by-side layout */}
        <section id="help" className="py-16 md:py-24 bg-[#F5F5F5]">
          <div className="container">
            <h2 className="text-3xl font-semibold text-[#1A2D44] text-center mb-4">How Can We Help?</h2>
            <p className="text-xl text-[#707070] max-w-4xl mx-auto px-8 text-center mb-12">
              Our expertise spans industry verticals as well as process and technology domains, and our vendor-agnostic
              approach ensures true partnership in driving business outcomes.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Broad Capabilities subsection */}
              <div>
                <h3 className="text-2xl font-semibold text-[#1A2D44] mb-8 text-center">Broad Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Box 1: Technology Cost Assessment */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#5D6B7E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">Technology Cost Assessment</h3>
                        <p className="text-sm text-[#7FD9DB]">Baseline all telecom & cloud spend</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Full visibility into every telecom, cloud & SaaS charge—before we negotiate a single dollar.
                      </p>
                    </div>
                  </div>

                  {/* Box 2: Vendor Selection */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#5D6B7E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">Vendor Selection</h3>
                        <p className="text-sm text-[#7FD9DB]">Find the right partners</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Objective evaluation of vendors based on your specific requirements and business goals.
                      </p>
                    </div>
                  </div>

                  {/* Box 3: Vendor Contract Negotiation */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#5D6B7E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">Vendor Contract Negotiation</h3>
                        <p className="text-sm text-[#7FD9DB]">Leverage 30 years of benchmarks</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Benchmarking 30 yrs of rate data to slash costs and lock in flexible terms.
                      </p>
                    </div>
                  </div>

                  {/* Box 4: Lifecycle Asset Management */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#5D6B7E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">Lifecycle Asset Management</h3>
                        <p className="text-sm text-[#7FD9DB]">Track from activation to retirement</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Track each circuit, license & device from activation to retirement—no more zombie services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Domain Expertise subsection */}
              <div>
                <h3 className="text-2xl font-semibold text-[#1A2D44] mb-8 text-center">Deep Domain Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Box 5: Network & Connectivity */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#4D5B6E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">Network & Connectivity</h3>
                        <p className="text-sm text-[#7FD9DB]">SD-WAN, SASE, MPLS, DIA</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        SD-WAN, SASE, MPLS, DIA—designed, sourced & optimized.
                      </p>
                    </div>
                  </div>

                  {/* Box 6: UCaaS / CCaaS */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#4D5B6E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">UCaaS / CCaaS</h3>
                        <p className="text-sm text-[#7FD9DB]">Align with hybrid-work needs</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Align license mix and QOS with hybrid-work user behaviour.
                      </p>
                    </div>
                  </div>

                  {/* Box 7: Cloud & Colocation */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#4D5B6E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">Cloud & Colocation</h3>
                        <p className="text-sm text-[#7FD9DB]">Right-size workloads & costs</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Right-size workloads, interconnects and egress to cut spend.
                      </p>
                    </div>
                  </div>

                  {/* Box 8: Cybersecurity & Compliance */}
                  <div className="group relative h-72 rounded-md overflow-hidden bg-[#4D5B6E]">
                    <div className="absolute inset-0 bg-[#1A2D44]/10 group-hover:bg-[#1A2D44]/30 transition-colors duration-300" />
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                      <div>
                        <h3 className="text-xl font-semibold">Cybersecurity & Compliance</h3>
                        <p className="text-sm text-[#7FD9DB]">Zero-Trust, MDR & compliance</p>
                      </div>
                      <p className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Zero-Trust, MDR and compliance controls scoped for ROI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Company Section */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/images/don-chester.png"
                  alt="Don Chester"
                  width={400}
                  height={500}
                  className="rounded-md shadow-lg mx-auto md:mx-0"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-[#1A2D44]">About Don Chester</h2>
                <p className="text-xl text-[#1A2D44]">
                  With over 30 years of experience consulting with medium and large multi-location organizations, I've
                  developed a methodology that stands out because it's simple, concise, and easy to maintain.
                </p>
                <p className="text-[#707070]">
                  My mission is to help you gain certainty about your technology asset inventory and costs so you can
                  make informed decisions. I became so frustrated watching technology providers offer absolutely no help
                  to their customers that I created a framework to help my clients make sense of the chaos.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-[#F5F5F5] rounded-md hover:shadow-md transition-shadow duration-300">
                    <p className="text-3xl font-bold text-[#42C5C9]">30+</p>
                    <p className="text-sm text-[#707070]">Years Experience</p>
                  </div>
                  <div className="text-center p-4 bg-[#F5F5F5] rounded-md hover:shadow-md transition-shadow duration-300">
                    <p className="text-3xl font-bold text-[#42C5C9]">50+</p>
                    <p className="text-sm text-[#707070]">Enterprise Clients</p>
                  </div>
                  <div className="text-center p-4 bg-[#F5F5F5] rounded-md hover:shadow-md transition-shadow duration-300">
                    <p className="text-3xl font-bold text-[#42C5C9]">12-15%</p>
                    <p className="text-sm text-[#707070]">Average Client Savings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with updated 7-Eleven logo */}
        <TestimonialSection testimonials={testimonials} />

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4 text-[#1A2D44]">Frequently Asked Questions</h2>
              <p className="text-xl text-[#707070] max-w-3xl mx-auto">
                Get answers to common questions about our technology cost management services
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                    Who is this service best suited for?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#707070] px-6 pb-4">
                    Our methodology is specifically designed for medium to large multi-location organizations with
                    complex technology environments. It's particularly valuable for CIOs, CFOs, and IT executives who
                    need clear visibility into their technology costs and contractual obligations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                    How long does the implementation process take?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#707070] px-6 pb-4">
                    The initial implementation typically takes 4-8 weeks, depending on the size and complexity of your
                    organization. However, you'll start seeing valuable insights within the first few weeks as we begin
                    analyzing your accounts payable data and vendor invoices.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                    Can we implement this framework on our own?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#707070] px-6 pb-4">
                    Yes, the 6-step framework is designed to be implementable by your internal team. However, many
                    organizations choose to leverage our expertise for the initial setup and training, then maintain the
                    system themselves going forward. We offer flexible engagement models to suit your needs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                    What kind of ROI can we expect?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#707070] px-6 pb-4">
                    Most clients identify cost-saving opportunities of 15-30% of their technology spend within the first
                    3 months. Beyond direct cost savings, the improved visibility and decision-making capabilities
                    typically lead to better technology investments and reduced waste over time.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="bg-white mb-4 rounded-md shadow-md border border-[#E0E0E0] overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-medium text-[#1A2D44] px-6 py-4 hover:no-underline hover:bg-[#F5F5F5]">
                    What's the first step to get started?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#707070] px-6 pb-4">
                    The first step is to schedule a 30-minute introduction call where we'll review the framework and
                    discuss how it applies to your specific situation. After that, you can decide whether to implement
                    it on your own or with our assistance. There's no obligation, and you'll gain valuable insights just
                    from the initial conversation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Updated Dual-CTA Section with neutral background */}
        <section className="py-20 bg-[#F5F5F5] text-[#1A2D44]">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Download Guide */}
              <div className="bg-white/50 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">Download the Full 6 Steps Framework Now!</h2>
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/titlepage.png"
                    alt="6 Steps guide cover"
                    width={200}
                    height={270}
                    className="rounded-md shadow-lg"
                  />
                </div>
                <form className="flex flex-col gap-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Work email"
                    className="rounded-md px-4 py-3 text-[#1A2D44] placeholder-gray-500 border border-gray-300"
                  />
                  <Button type="submit" className="px-8 py-3 bg-[#42C5C9] hover:bg-[#2A9B9F] text-white">
                    Get 6 Steps
                  </Button>
                </form>
              </div>

              {/* Right Column - Schedule Consultation */}
              <div className="bg-white/50 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">Schedule a Free, No-Obligation Consultation</h2>
                <div className="bg-white rounded-lg p-4 h-64 flex flex-col items-center justify-center">
                  <Calendar className="w-12 h-12 text-[#42C5C9] mb-4" />
                  <p className="text-center mb-4">Select a convenient time for a 30-minute discovery call</p>
                  <Button className="bg-[#42C5C9] hover:bg-[#2A9B9F] text-white">Schedule Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A2D44] text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Image
                src="/images/dc-tech-logo-white.png"
                alt="DC Tech Consulting"
                width={240}
                height={54}
                className="h-14 w-auto"
              />
              <p className="text-sm">
                Helping organizations gain clarity and control over their technology costs for over 30 years.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-sm hover:text-[#42C5C9] transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-[#42C5C9] transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-[#42C5C9] transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-[#42C5C9] transition-colors duration-200">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-[#42C5C9] transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-[#42C5C9] transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-[#42C5C9] transition-colors duration-200">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} DC Consulting Group. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
