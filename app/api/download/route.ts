import { promises as fs } from "fs"
import path from "path"
import { createHmac, timingSafeEqual } from "crypto"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

function verify(token: string, secret: string) {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8")
    const parts = decoded.split(".")
    // Allow emails with dots by popping from the end
    if (parts.length < 3) return false
    const sigHex = parts.pop()
    const expStr = parts.pop()
    if (!sigHex || !expStr) return false

    const email = parts.join(".")
    const exp = Number(expStr)
    if (!email || Number.isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return false

    const expectedHex = createHmac("sha256", secret).update(`${email}.${exp}`).digest("hex")
    const sigBuf = Buffer.from(sigHex, "hex")
    const expectedBuf = Buffer.from(expectedHex, "hex")
    if (sigBuf.length !== expectedBuf.length) return false
    return timingSafeEqual(sigBuf, expectedBuf)
  } catch {
    return false
  }
}

export async function GET(req: Request) {
  if (!process.env.DOWNLOAD_TOKEN_SECRET) {
    return new Response("Server misconfigured", { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token") || ""
  const ok = verify(token, process.env.DOWNLOAD_TOKEN_SECRET)
  if (!ok) return new Response("Invalid or expired link", { status: 403 })

  // If a Blob URL is configured, redirect after verification (Option B)
  const blobUrl = process.env.GUIDE_BLOB_URL
  if (blobUrl) {
    return NextResponse.redirect(blobUrl)
  }

  // Fallback: serve from repository file while migrating
  const fileName = process.env.GUIDE_FILE_NAME || "dc-tech-6-steps.pdf"
  const privatePath = path.join(process.cwd(), "private", fileName)
  const publicPath = path.join(process.cwd(), "public", fileName)

  try {
    let file: Buffer
    try {
      file = await fs.readFile(privatePath)
    } catch {
      file = await fs.readFile(publicPath)
    }

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="DC-Tech-6-Steps.pdf"',
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return new Response("File not found", { status: 404 })
  }
}
