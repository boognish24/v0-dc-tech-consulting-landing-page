"use client"

import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import LeadForm from "@/components/LeadForm"
import { CheckCircle, BookOpen } from "lucide-react"

const learningPoints = [
  "Collect detailed asset information, including hidden assets",
  "Summarize data in an actionable format",
  "Eliminate errors, prevent overspending and contract surprises",
  "Make informed decisions to expedite projects",
]

const whatsInside = [
  "The proven 6-Step process",
  "Common mistakes to avoid",
  "Real-world examples of cost savings and accelerated projects",
]

export default function PlaybookClient() {
  const handleDownload = useCallback((data: { downloadUrl?: string }) => {
    if (data.downloadUrl) {
      window.location.href = data.downloadUrl
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1A2D44] pb-12">

      {/* HEADER */}
      <header className="w-full py-6 md:py-8">
        <div className="container">
          <Link href="/">
            <Image
              src="/images/dc-logo-transparent.png"
              alt="DC Tech Consulting"
              width={220}
              height={48}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <main className="container pt-4 md:pt-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 h-full flex flex-col justify-between">

            {/* TOP - Header */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Start Every IT Project with <span className="text-[#42C5C9]">Clarity and Confidence</span>
            </h1>

            {/* MIDDLE - Body text */}
            <p className="text-xl md:text-2xl text-white" style={{ lineHeight: 2 }}>
              Download the free Information Technology Inventory Playbook to get your roadmap for the 6-Steps for complete visibility over your assets, costs, and contracts.
            </p>

            <p className="text-xl md:text-2xl text-white/80" style={{ lineHeight: 2 }}>
              Projects without a precise Technology asset baseline are prone to delays, cost overruns, and reduced value. <span className="text-white font-semibold">Learn how to:</span>
            </p>

            {/* BOTTOM - Learning points box */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10">
              <ul className="space-y-5">
                {learningPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-[#42C5C9] shrink-0 mt-0.5" />
                    <span className="text-white text-lg md:text-xl">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5">

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-50 p-8 text-center border-b border-gray-100">
                <h3 className="text-3xl font-bold text-[#1A2D44] mb-2">Get Your Playbook</h3>
                <p className="text-lg text-gray-600">Start the 6-Step process today.</p>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex justify-center">
                  <Image
                    src="/images/titlepage.png"
                    alt="6 Steps Guide Cover"
                    width={160}
                    height={206}
                    className="rounded shadow-lg"
                  />
                </div>

                <div>
                  <p className="font-bold text-[#1A2D44] text-sm uppercase tracking-wide mb-5 text-center">What's Inside:</p>
                  <div className="space-y-3">
                    {whatsInside.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 text-gray-700 px-5 py-4 rounded-lg text-lg font-medium">
                        <BookOpen className="w-5 h-5 text-[#42C5C9] shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <LeadForm
                  endpoint="/api/playbook-lead"
                  showName={true}
                  nameLabel="Name"
                  namePlaceholder="Your name"
                  buttonText="Get My Free Playbook"
                  loadingText="Preparing download..."
                  successMessage="Your download is starting!"
                  onSuccess={handleDownload}
                  variant="stacked"
                  className="[&_input]:bg-white [&_input]:border-gray-300 [&_input]:text-gray-900 [&_button]:font-bold [&_button]:text-lg [&_button]:py-4 [&_button]:shadow-lg"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Final Summation */}
        <div className="mt-20 pt-12 border-t border-white/10 text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Whether lacking in-house resources or stretched thin, this guide provides the framework for regaining control over your technology landscape.
          </p>
        </div>

      </main>

      <footer className="mt-16 border-t border-white/5 py-8 text-center text-sm text-gray-500">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} DC Tech Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
