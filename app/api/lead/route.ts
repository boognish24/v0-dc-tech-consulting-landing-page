import { NextResponse } from "next/server"
import { Resend } from "resend"
import { GuideDownloadEmail } from "@/app/emails/guide-download"
import { promises as fs } from "fs"
import path from "path"
import { createHmac } from "crypto"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

const BLOCKED = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "aol.com",
]

function isWorkEmail(email: string) {
  const m = email.toLowerCase().match(/@([^@]+)$/)
  const domain = m?.[1] || ""
  return domain.length > 0 && !BLOCKED.includes(domain)
}

function makeToken(email: string) {
  if (!process.env.DOWNLOAD_TOKEN_SECRET) throw new Error("Missing DOWNLOAD_TOKEN_SECRET")
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24h expiry
  const payload = `${email}.${exp}`
  const sig = createHmac("sha256", process.env.DOWNLOAD_TOKEN_SECRET).update(payload).digest("hex")
  return Buffer.from(`${payload}.${sig}`).toString("base64url")
}

// No attachment needed when delivering via blob link

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || ""
    let email = ""

    if (contentType.includes("application/json")) {
      const body = await request.json()
      email = String(body.email || "").trim()
    } else {
      const formData = await request.formData()
      email = String(formData.get("email") || "").trim()
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 })
    }
    if (!isWorkEmail(email)) {
      return NextResponse.json({ success: false, message: "Please use a work email" }, { status: 400 })
    }

    const origin = new URL(request.url).origin
    const token = makeToken(email)
    const downloadUrl = `${origin}/api/download?token=${token}`

    const from = process.env.RESEND_FROM
    if (!from) throw new Error("Missing RESEND_FROM")

    const { error } = await resend.emails.send({
      from: `DC Tech Consulting <${from}>`,
      to: email,
      reply_to: process.env.RESEND_REPLY_TO || "don@dctechconsulting.net",
      subject: "Your 6 Steps Guide",
      react: GuideDownloadEmail({ siteUrl: origin, downloadUrl, chatUrl: "mailto:don@dctechconsulting.net" }),
    })

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Thank you! Check your email for the PDF." })
  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
