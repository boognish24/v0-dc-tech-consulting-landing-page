import { createHmac, timingSafeEqual } from "crypto"

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET

/**
 * Creates a signed token for secure email actions (download, unsubscribe)
 * Format: base64url({purpose}:{email}:{exp}.{sig})
 */
export function createToken(
  email: string,
  purpose: "download" | "unsubscribe",
  expiryHours = 24
): string {
  if (!SECRET) throw new Error("Missing DOWNLOAD_TOKEN_SECRET")

  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * expiryHours
  const payload = `${purpose}:${email}:${exp}`
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex")
  return Buffer.from(`${payload}.${sig}`).toString("base64url")
}

/**
 * Verifies a token and returns the email if valid
 * Returns null if token is invalid, expired, or wrong purpose
 */
export function verifyToken(
  token: string,
  expectedPurpose: "download" | "unsubscribe"
): { email: string; exp: number } | null {
  if (!SECRET) return null

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8")

    // Split by last dot to get signature
    const lastDotIndex = decoded.lastIndexOf(".")
    if (lastDotIndex === -1) return null

    const payloadPart = decoded.slice(0, lastDotIndex)
    const sig = decoded.slice(lastDotIndex + 1)

    // Parse payload: purpose:email:exp
    // Email might contain colons, so we need to be careful
    const firstColonIndex = payloadPart.indexOf(":")
    const lastColonIndex = payloadPart.lastIndexOf(":")

    if (firstColonIndex === -1 || firstColonIndex === lastColonIndex) return null

    const purpose = payloadPart.slice(0, firstColonIndex)
    const expStr = payloadPart.slice(lastColonIndex + 1)
    const email = payloadPart.slice(firstColonIndex + 1, lastColonIndex)

    // Verify purpose matches
    if (purpose !== expectedPurpose) return null

    // Verify not expired
    const exp = parseInt(expStr, 10)
    if (Number.isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return null

    // Verify signature
    const expectedSig = createHmac("sha256", SECRET).update(payloadPart).digest("hex")
    const sigBuf = Buffer.from(sig, "hex")
    const expectedBuf = Buffer.from(expectedSig, "hex")

    if (sigBuf.length !== expectedBuf.length) return null
    if (!timingSafeEqual(sigBuf, expectedBuf)) return null

    return { email, exp }
  } catch {
    return null
  }
}

/**
 * Legacy token creation for download links (backwards compatible)
 * Format: base64url({email}.{exp}.{sig})
 */
export function createLegacyDownloadToken(email: string, expiryHours = 24): string {
  if (!SECRET) throw new Error("Missing DOWNLOAD_TOKEN_SECRET")

  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * expiryHours
  const payload = `${email}.${exp}`
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex")
  return Buffer.from(`${payload}.${sig}`).toString("base64url")
}
