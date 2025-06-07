"use client"

import React from "react"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ChairSeriesError() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          We apologize, but we couldn&apos;t find the chair series you&apos;re looking for. It may have been
          moved or is no longer available.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/chairs">
            <Button variant="outline">Back to Chairs</Button>
          </Link>
          <Link href="/">
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
