"use client"

import { useState, type FormEvent } from "react"

type LeadFormOptions = {
  source?: string
}

export function useLeadForm(_opts: LeadFormOptions = {}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submitLead(payload: { name?: string; email: string }) {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data?.message || "Failed to submit. Please try again.")
    }
    return data
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await submitLead({ name, email })
      setMessage("Your IT Inventory Playbook is on the way!")
      setName("")
      setEmail("")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    loading,
    message,
    error,
    onSubmit,
  }
}

export default useLeadForm

