import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const email = formData.get("email")

    // In a real implementation, you would:
    // 1. Validate the email
    // 2. Store it in your database or CRM
    // 3. Send the PDF link or trigger an email with the PDF

    console.log("Lead captured:", email)

    // For demo purposes, we'll just return a success response
    // In production, you would integrate with MailerLite, HubSpot, etc.

    return NextResponse.json({
      success: true,
      message: "Thank you! Check your email for the PDF.",
      pdfUrl: "/downloads/6steps.pdf", // This would be a real URL in production
    })
  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
