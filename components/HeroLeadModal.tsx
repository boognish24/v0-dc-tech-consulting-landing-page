"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLeadForm } from "@/hooks/use-lead-form"

export default function HeroLeadModal() {
  const [open, setOpen] = useState(false)
  const form = useLeadForm({ source: "hero" })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#42C5C9] hover:bg-[#2A9B9F] text-white uppercase font-medium text-sm px-6 py-3 h-auto transition-colors duration-200">
          Get 6 Steps
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Get the 6 Steps Guide</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input id="lead-name" name="name" placeholder="Your name" value={form.name} onChange={(e) => form.setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lead-email">Work email</Label>
            <Input id="lead-email" name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => form.setEmail(e.target.value)} />
          </div>
          <Button type="submit" disabled={form.loading} className="w-full bg-[#42C5C9] hover:bg-[#2A9B9F]">
            {form.loading ? "Sending..." : "Email Me the Guide"}
          </Button>
          {form.message && <p className="text-green-600 text-sm">{form.message}</p>}
          {form.error && <p className="text-red-600 text-sm">{form.error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}

