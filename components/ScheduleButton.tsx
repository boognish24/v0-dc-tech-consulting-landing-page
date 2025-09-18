"use client"

import { useEffect, useState } from "react"
import { PopupButton } from "react-calendly"

export default function ScheduleButton({ text = "Schedule Now" }: { text?: string }) {
  const [popupRoot, setPopupRoot] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (typeof document !== "undefined") setPopupRoot(document.body)
  }, [])
  if (!popupRoot) return null
  return (
    <PopupButton
      url="https://calendly.com/donchester"
      rootElement={popupRoot}
      text={text}
      className="bg-[#42C5C9] hover:bg-[#2A9B9F] text-white px-4 py-2 rounded-md"
    />
  )
}

