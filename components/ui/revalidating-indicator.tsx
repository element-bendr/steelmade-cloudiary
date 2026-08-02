"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface RevalidatingIndicatorProps {
  className?: string
}

export function RevalidatingIndicator({ className }: RevalidatingIndicatorProps) {
  const [show, setShow] = useState(false)

  // Only show after a short delay to prevent flashing
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm shadow-lg backdrop-blur-sm transition-opacity",
        "animate-in fade-in slide-in-from-bottom-2 duration-300",
        className
      )}
      role="status"
      aria-label="Updating content"
    >
      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      <span className="text-gray-700">Updating...</span>
    </div>
  )
}
