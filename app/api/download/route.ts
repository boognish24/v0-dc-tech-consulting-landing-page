import { promises as fs } from "fs"
import path from "path"
import { createHmac } from "crypto"

export const runtime = "nodejs"

function verify(token: string, secret: string) {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8")
    const parts = decoded.split(".")
    if (parts.length !== 3) return false
    const [email, expStr, sig] = parts
    const exp = Number(expStr)
    if (!email || !exp || !sig) return false
    if (Number.isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return false
    const expected = createHmac("sha256", secret).update(`${email}.${exp}`).digest("hex")
    return sig === expected
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

  // Prefer private storage; fall back to public if still in transition
  const privatePath = path.join(process.cwd(), "private", "dc-tech-6-steps.pdf")
  const publicPath = path.join(process.cwd(), "public", "dc-tech-6-steps.pdf")

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

