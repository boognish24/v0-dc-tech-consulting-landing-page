import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const site = process.env.SITE_URL || "http://localhost:3000"
  const host = site.replace(/\/$/, "")
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*"],
    },
    sitemap: `${host}/sitemap.xml`,
    host,
  }
}

