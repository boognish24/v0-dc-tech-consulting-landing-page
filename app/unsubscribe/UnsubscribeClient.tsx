"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

type Status = "loading" | "success" | "error" | "invalid"

export default function UnsubscribeClient() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<Status>("loading")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    if (!token) {
      setStatus("invalid")
      setMessage("Missing unsubscribe token")
      return
    }

    async function processUnsubscribe() {
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (data.success) {
          setStatus("success")
          setEmail(data.email || "")
          setMessage(data.message)
        } else {
          setStatus("error")
          setMessage(data.message || "Failed to unsubscribe")
        }
      } catch {
        setStatus("error")
        setMessage("Something went wrong. Please try again.")
      }
    }

    processUnsubscribe()
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Image
              src="/images/dc-tech-logo.png"
              alt="DC Tech Consulting"
              width={200}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          {status === "loading" && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-gray-800">
                Processing your request...
              </h1>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Unsubscribed
              </h1>
              <p className="text-gray-600 mb-2">{message}</p>
              {email && (
                <p className="text-sm text-gray-500 mb-6">
                  Email: {email}
                </p>
              )}
              <p className="text-sm text-gray-500 mb-6">
                You will no longer receive follow-up emails from us.
              </p>
              <Link
                href="/"
                className="inline-block bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary/90 transition-colors"
              >
                Return to Homepage
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Unable to Unsubscribe
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500 mb-6">
                If you continue to receive unwanted emails, please contact us at{" "}
                <a
                  href="mailto:don@dctechconsulting.net"
                  className="text-secondary hover:underline"
                >
                  don@dctechconsulting.net
                </a>
              </p>
              <Link
                href="/"
                className="inline-block bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary/90 transition-colors"
              >
                Return to Homepage
              </Link>
            </>
          )}

          {status === "invalid" && (
            <>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Invalid Link
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500 mb-6">
                This unsubscribe link may be expired or invalid. Please contact us at{" "}
                <a
                  href="mailto:don@dctechconsulting.net"
                  className="text-secondary hover:underline"
                >
                  don@dctechconsulting.net
                </a>
                {" "}to manage your email preferences.
              </p>
              <Link
                href="/"
                className="inline-block bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary/90 transition-colors"
              >
                Return to Homepage
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary py-4 text-center">
        <p className="text-white/70 text-sm">
          © {new Date().getFullYear()} DC Technology Consulting, LLC
        </p>
      </footer>
    </div>
  )
}
