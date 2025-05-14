import { Button } from "@/components/ui/button"

export default function LeadMagnetCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#42C5C9] to-[#2A9B9F] text-white">
      <div className="container text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Download the Full Six Steps Guide</h2>
        <p className="mb-8">
          Get the 12-page playbook that CIOs use to uncover <em>hidden</em> telecom savings. It's free.
        </p>

        <form action="/api/lead" method="POST" className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Work email"
            className="flex-1 rounded-md px-4 py-3 text-[#1A2D44] placeholder-gray-500"
          />
          <Button type="submit" className="px-8 py-3 bg-[#1A2D44] hover:bg-[#152535]">
            Send Me the PDF
          </Button>
        </form>

        <p className="mt-4 text-sm opacity-80">We'll send the link immediately—no spam, ever.</p>
      </div>
    </section>
  )
}
