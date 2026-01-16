import type { Metadata } from "next"
import PlaybookClient from "./PlaybookClient"

export const metadata: Metadata = {
  title: "IT Inventory Playbook | DC Tech Consulting",
  description:
    "Download the free 6-step playbook to reduce risk, cut costs, and get IT projects done faster. Start every IT project with clarity and confidence.",
  openGraph: {
    title: "IT Inventory Playbook - Free Download",
    description: "6 Steps to gain clarity and control over your technology costs",
    images: ["/images/titlepage.png"],
  },
}

export default function PlaybookPage() {
  return <PlaybookClient />
}
