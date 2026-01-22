import type { Metadata } from "next"
import { Suspense } from "react"
import UnsubscribeClient from "./UnsubscribeClient"

export const metadata: Metadata = {
  title: "Unsubscribe - DC Tech Consulting",
  description: "Manage your email preferences",
  robots: { index: false, follow: false },
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<UnsubscribeLoading />}>
      <UnsubscribeClient />
    </Suspense>
  )
}

function UnsubscribeLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-gray-600">Processing...</p>
      </div>
    </div>
  )
}
