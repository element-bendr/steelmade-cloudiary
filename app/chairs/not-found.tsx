import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ChairsNotFound() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="mb-4 text-2xl font-bold">No Results Found</h1>
        <p className="mb-8 text-muted-foreground">
          We couldn&apos;t find what you&apos;re looking for. Please try checking other chair
          series or browse our complete collection.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/chairs">
            <Button variant="outline">Browse All Chairs</Button>
          </Link>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
