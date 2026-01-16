import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.SITE_URL || "http://localhost:3000"
  const base = site.replace(/\/$/, "")
  const now = new Date()
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/playbook`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]
}

