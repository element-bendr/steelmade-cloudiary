"use client"

import React from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ChairsError() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
        <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>
        <p className="mb-8 text-muted-foreground">
          We apologize for the inconvenience. Please try refreshing the page or contact our support team
          if the problem persists.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
