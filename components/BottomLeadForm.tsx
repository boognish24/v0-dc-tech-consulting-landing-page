"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLeadForm } from "@/hooks/use-lead-form"

export default function BottomLeadForm() {
  const form = useLeadForm({ source: "bottom" })
  return (
    <form className="flex flex-col gap-4" onSubmit={form.onSubmit} action="/api/lead" method="post">
      <Input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => form.setName(e.target.value)}
        className="bg-white rounded-md px-4 py-3 text-[#1A2D44] placeholder:text-gray-500 border border-gray-300"
      />
      <Input
        type="email"
        name="email"
        required
        placeholder="Work email"
        value={form.email}
        onChange={(e) => form.setEmail(e.target.value)}
        className="bg-white rounded-md px-4 py-3 text-[#1A2D44] placeholder:text-gray-500 border border-gray-300"
      />
      <Button type="submit" disabled={form.loading} className="px-8 py-3 bg-[#42C5C9] hover:bg-[#2A9B9F] text-white">
        {form.loading ? "Sending..." : "Get 6 Steps"}
      </Button>
      {form.message && <p className="text-green-700 text-sm">{form.message}</p>}
      {form.error && <p className="text-red-600 text-sm">{form.error}</p>}
    </form>
  )
}

