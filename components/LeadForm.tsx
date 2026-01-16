"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LeadFormProps {
  /** API endpoint to submit to */
  endpoint?: string
  /** Show first name field */
  showName?: boolean
  /** Label for name field */
  nameLabel?: string
  /** Placeholder for name field */
  namePlaceholder?: string
  /** Button text */
  buttonText?: string
  /** Button text while loading */
  loadingText?: string
  /** Success message to display */
  successMessage?: string
  /** Callback on successful submission - receives response data */
  onSuccess?: (data: { downloadUrl?: string; message?: string }) => void
  /** Layout variant */
  variant?: "stacked" | "inline"
  /** Additional className */
  className?: string
}

/**
 * Unified lead capture form component.
 * Can be used for email-only or name+email capture.
 * Supports custom success handlers for different behaviors (e.g., direct download).
 */
export default function LeadForm({
  endpoint = "/api/lead",
  showName = true,
  nameLabel = "First Name",
  namePlaceholder = "Your first name",
  buttonText = "Get the Playbook",
  loadingText = "Sending...",
  successMessage = "Your IT Inventory Playbook is on the way!",
  onSuccess,
  variant = "stacked",
  className = "",
}: LeadFormProps) {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...(showName && firstName ? { firstName } : {}),
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit. Please try again.")
      }

      // Call custom success handler if provided
      if (onSuccess) {
        onSuccess(data)
      }

      setMessage(data?.message || successMessage)
      setFirstName("")
      setEmail("")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        {showName && (
          <Input
            name="firstName"
            placeholder={namePlaceholder || "Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="flex-1"
          />
        )}
        <Input
          name="email"
          type="email"
          required
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-teal hover:bg-teal-dark text-white whitespace-nowrap"
        >
          {loading ? loadingText : buttonText}
        </Button>
        {(message || error) && (
          <div className="sm:col-span-full">
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        )}
      </form>
    )
  }

  // Stacked variant (default)
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {showName && (
        <div className="grid gap-2">
          <Label htmlFor="lead-firstName">{nameLabel}</Label>
          <Input
            id="lead-firstName"
            name="firstName"
            placeholder={namePlaceholder}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="lead-email">Work Email</Label>
        <Input
          id="lead-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-teal hover:bg-teal-dark text-white"
      >
        {loading ? loadingText : buttonText}
      </Button>
      {message && <p className="text-green-600 text-sm text-center">{message}</p>}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </form>
  )
}
