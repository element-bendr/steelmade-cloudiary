"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { RefreshCcw } from "lucide-react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription className="mt-2">
          {error.message || "An unexpected error occurred"}
        </AlertDescription>
        <Button
          onClick={reset}
          variant="outline"
          className="mt-4 gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
      </Alert>
    </div>
  )
}