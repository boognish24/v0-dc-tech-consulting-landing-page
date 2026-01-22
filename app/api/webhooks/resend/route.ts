import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = process.env.RESEND_AUDIENCE_ID
const webhookSecret = process.env.RESEND_WEBHOOK_SECRET

/**
 * Webhook handler for Resend email events
 * Receives: delivered, opened, clicked, bounced, complained
 *
 * Setup:
 * 1. Register webhook in Resend Dashboard: https://resend.com/webhooks
 * 2. URL: https://dctechconsulting.net/api/webhooks/resend
 * 3. Copy signing secret to RESEND_WEBHOOK_SECRET env var
 */
export async function POST(request: Request) {
  try {
    // Get raw body for signature verification
    const body = await request.text()

    let payload: { type: string; data: Record<string, unknown> }

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      const svixId = request.headers.get("svix-id")
      const svixTimestamp = request.headers.get("svix-timestamp")
      const svixSignature = request.headers.get("svix-signature")

      if (!svixId || !svixTimestamp || !svixSignature) {
        console.error("[Resend Webhook] Missing Svix headers")
        return new Response("Missing signature headers", { status: 401 })
      }

      try {
        // Use Resend SDK's built-in webhook verification
        payload = resend.webhooks.verify({
          payload: body,
          headers: {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
          },
          secret: webhookSecret,
        }) as { type: string; data: Record<string, unknown> }
      } catch (err) {
        console.error("[Resend Webhook] Invalid signature:", err)
        return new Response("Invalid signature", { status: 401 })
      }
    } else {
      console.warn("[Resend Webhook] No RESEND_WEBHOOK_SECRET configured - skipping signature verification")
      payload = JSON.parse(body)
    }

    const { type, data } = payload

    // Extract email from various event formats
    const email = (data?.to as string[])?.[0] || (data?.to as string) || (data?.email as string)

    console.log(`[Resend Webhook] ${type}:`, email || "unknown")

    // Auto-mark as unsubscribed on bounce or spam complaint
    if ((type === "email.bounced" || type === "email.complained") && audienceId && email) {
      try {
        await resend.contacts.update({
          audienceId,
          email,
          unsubscribed: true,
        })
        console.log(`[Resend Webhook] Marked ${email} as unsubscribed due to ${type}`)
      } catch (err) {
        console.error("[Resend Webhook] Failed to update contact:", err)
      }
    }

    // Log other events for debugging/monitoring
    if (type === "email.opened") {
      console.log(`[Resend Webhook] Email opened by ${email}`)
    } else if (type === "email.clicked") {
      console.log(`[Resend Webhook] Link clicked by ${email}`)
    } else if (type === "email.delivered") {
      console.log(`[Resend Webhook] Email delivered to ${email}`)
    }

    // Must return 200 to acknowledge receipt
    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("[Resend Webhook] Error processing webhook:", error)
    return new Response("Error", { status: 500 })
  }
}

// Resend only sends POST requests to webhooks
export async function GET() {
  return new Response("Webhook endpoint. Use POST.", { status: 405 })
}
