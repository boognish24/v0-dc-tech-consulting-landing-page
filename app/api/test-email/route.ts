import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    const from = process.env.RESEND_FROM || "hello@dctechconsulting.net"

    const { data, error } = await resend.emails.send({
      from: `DC Tech Consulting <${from}>`,
      to: "kyle@dctechconsulting.net",
      subject: "test",
      text: "test",
    })

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 })
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}

// Optional: allow a manual GET trigger for quick local testing
export async function GET() {
  return POST()
}

