import { NextResponse } from "next/server"
import { Resend } from "resend"
import { PlaybookDeliveryEmail } from "@/app/emails/playbook-delivery"
import { PlaybookFollowup1Email } from "@/app/emails/playbook-followup-1"
import { PlaybookFollowup2Email } from "@/app/emails/playbook-followup-2"
import { createHmac } from "crypto"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { createToken } from "@/lib/tokens"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

const BLOCKED_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "aol.com",
])

function isWorkEmail(email: string) {
  const m = email.toLowerCase().match(/@([^@]+)$/)
  const domain = m?.[1] || ""
  return domain.length > 0 && !BLOCKED_DOMAINS.has(domain)
}

function makeToken(email: string) {
  if (!process.env.DOWNLOAD_TOKEN_SECRET) throw new Error("Missing DOWNLOAD_TOKEN_SECRET")
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24h expiry
  const payload = `${email}.${exp}`
  const sig = createHmac("sha256", process.env.DOWNLOAD_TOKEN_SECRET).update(payload).digest("hex")
  return Buffer.from(`${payload}.${sig}`).toString("base64url")
}

// Optional rate limiting via Upstash (gracefully skips if not configured)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? Redis.fromEnv() : null
const ipLimiter = redis
  ? new Ratelimit({
      redis,
      prefix: "playbook:ip",
      limiter: Ratelimit.slidingWindow(3, "1 m"), // 3 requests per minute per IP
      analytics: true,
    })
  : null
const emailLimiter = redis
  ? new Ratelimit({
      redis,
      prefix: "playbook:email",
      limiter: Ratelimit.slidingWindow(10, "24 h"), // 10 per day per email
      analytics: true,
    })
  : null

function rateLimitedJson(body: unknown, status = 200, meta?: { limit?: number; remaining?: number; reset?: number }) {
  const headers: Record<string, string> = {}
  if (meta?.limit != null) headers["X-RateLimit-Limit"] = String(meta.limit)
  if (meta?.remaining != null) headers["X-RateLimit-Remaining"] = String(meta.remaining)
  if (meta?.reset != null) headers["X-RateLimit-Reset"] = String(meta.reset)
  if (!redis) headers["X-RateLimit-Skipped"] = "1"
  return NextResponse.json(body, { status, headers })
}

export async function POST(request: Request) {
  try {
    // 1) IP-based rate limit (before any heavy work) - wrapped in try/catch for graceful failure
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    const ip = forwarded || request.headers.get("x-real-ip") || "127.0.0.1"
    if (ipLimiter && process.env.DISABLE_RL !== "1") {
      try {
        const { success, limit, remaining, reset } = await ipLimiter.limit(ip)
        if (!success) {
          return rateLimitedJson(
            { success: false, message: "Too many requests from this IP. Please try again in a minute." },
            429,
            { limit, remaining, reset }
          )
        }
      } catch (rateLimitError) {
        console.warn("Rate limiting unavailable, skipping:", rateLimitError)
      }
    }

    const contentType = request.headers.get("content-type") || ""
    let email = ""
    let firstName = ""
    let website = ""

    if (contentType.includes("application/json")) {
      const body = await request.json()
      email = String(body.email || "").trim()
      firstName = String(body.firstName || "").trim()
      website = String(body.website || "").trim()
    } else {
      const formData = await request.formData()
      email = String(formData.get("email") || "").trim()
      firstName = String(formData.get("firstName") || "").trim()
      website = String(formData.get("website") || "").trim()
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return rateLimitedJson({ success: false, message: "Invalid email" }, 400)
    }
    if (!isWorkEmail(email)) {
      return rateLimitedJson({ success: false, message: "Please use a work email" }, 400)
    }
    // Honeypot: hidden field should remain empty; if set, treat as bot
    if (website) {
      return rateLimitedJson({ success: false, message: "Submission rejected" }, 400)
    }

    // 2) Email-based rate limit - wrapped in try/catch for graceful failure
    if (emailLimiter && process.env.DISABLE_RL !== "1") {
      try {
        const { success, limit, remaining, reset } = await emailLimiter.limit(email.toLowerCase())
        if (!success) {
          return rateLimitedJson(
            { success: false, message: "Too many requests for this email. Please try again later." },
            429,
            { limit, remaining, reset }
          )
        }
      } catch (rateLimitError) {
        console.warn("Rate limiting unavailable, skipping:", rateLimitError)
      }
    }

    const origin = new URL(request.url).origin
    const token = makeToken(email)
    // Use playbook-specific download endpoint with file parameter
    const downloadUrl = `${origin}/api/download?token=${token}&file=playbook`

    // Generate unsubscribe URL for follow-up emails (30-day expiry)
    const unsubscribeToken = createToken(email, "unsubscribe", 24 * 30)
    const unsubscribeUrl = `${origin}/unsubscribe?token=${unsubscribeToken}`

    const from = process.env.RESEND_FROM
    if (!from) throw new Error("Missing RESEND_FROM")

    if (process.env.LEAD_API_DRY_RUN === "1") {
      return rateLimitedJson({ success: true, message: "DRY_RUN: Email would be sent.", downloadUrl })
    }

    // Send emails (async, don't block download)
    const emailConfig = {
      from: `DC Tech Consulting <${from}>`,
      reply_to: process.env.RESEND_REPLY_TO || "don@dctechconsulting.net",
    }

    // Email 1: Immediate delivery
    resend.emails.send({
      ...emailConfig,
      to: email,
      subject: "Your Information Technology Inventory Playbook",
      react: PlaybookDeliveryEmail({
        siteUrl: origin,
        downloadUrl,
        firstName: firstName || undefined
      }),
    }).catch((err) => {
      console.error("Failed to send playbook delivery email:", err)
    })

    // Email 2: Follow-up #1 (15 minutes later)
    resend.emails.send({
      ...emailConfig,
      to: email,
      subject: "The #1 reason IT projects go over budget",
      react: PlaybookFollowup1Email({
        siteUrl: origin,
        firstName: firstName || undefined,
        unsubscribeUrl,
      }),
      scheduledAt: "in 15 minutes",
    }).catch((err) => {
      console.error("Failed to schedule follow-up email 1:", err)
    })

    // Email 3: Follow-up #2 (30 minutes later)
    resend.emails.send({
      ...emailConfig,
      to: email,
      subject: "Ready to make your next IT project easier?",
      react: PlaybookFollowup2Email({
        siteUrl: origin,
        firstName: firstName || undefined,
        unsubscribeUrl,
      }),
      scheduledAt: "in 30 minutes",
    }).catch((err) => {
      console.error("Failed to schedule follow-up email 2:", err)
    })

    // Store lead in Resend Contacts (if audience configured)
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      resend.contacts.create({
        audienceId,
        email,
        firstName: firstName || undefined,
        unsubscribed: false,
      }).catch((err) => {
        console.error("Failed to store contact:", err)
      })
    }

    // Return download URL for immediate download
    return rateLimitedJson({
      success: true,
      message: "Your download is starting! Check your email for a backup link.",
      downloadUrl
    })
  } catch (error) {
    console.error("Error processing playbook lead:", error)
    return rateLimitedJson({ success: false, message: "Something went wrong. Please try again." }, 500)
  }
}
