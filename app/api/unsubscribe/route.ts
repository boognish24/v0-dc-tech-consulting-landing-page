import { Resend } from "resend"
import { verifyToken } from "@/lib/tokens"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = process.env.RESEND_AUDIENCE_ID

/**
 * Unsubscribe API endpoint
 * Verifies the token and marks the contact as unsubscribed in Resend
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return Response.json(
        { success: false, message: "Missing token" },
        { status: 400 }
      )
    }

    // Verify the unsubscribe token
    const verified = verifyToken(token, "unsubscribe")
    if (!verified) {
      return Response.json(
        { success: false, message: "Invalid or expired unsubscribe link" },
        { status: 400 }
      )
    }

    const { email } = verified

    // Mark contact as unsubscribed in Resend Audience
    if (audienceId) {
      try {
        await resend.contacts.update({
          audienceId,
          email,
          unsubscribed: true,
        })
        console.log(`[Unsubscribe] ${email} unsubscribed successfully`)
      } catch (err) {
        // Contact might not exist in audience, which is fine
        console.warn(`[Unsubscribe] Could not update contact ${email}:`, err)
      }
    }

    return Response.json({
      success: true,
      message: "You have been unsubscribed from our emails.",
      email,
    })
  } catch (error) {
    console.error("[Unsubscribe] Error:", error)
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

// Also support GET for direct link clicks (will redirect to unsubscribe page)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return Response.redirect(new URL("/", request.url))
  }

  // Redirect to the unsubscribe page with the token
  const unsubscribeUrl = new URL("/unsubscribe", request.url)
  unsubscribeUrl.searchParams.set("token", token)
  return Response.redirect(unsubscribeUrl)
}
