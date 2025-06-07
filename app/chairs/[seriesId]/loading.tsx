import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ChairSeriesLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/chairs">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Chairs
          </Button>
        </Link>
        <Skeleton className="mb-4 h-12 w-[300px]" />
        <Skeleton className="h-20 max-w-3xl" />
      </div>

      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-square rounded-lg" />
        <div>
          <Skeleton className="mb-4 h-8 w-[200px]" />
          <div className="mb-6 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-[120px]" />
            ))}
          </div>
          
          <Skeleton className="h-12 w-[160px]" />
        </div>
      </div>

      <section className="mb-16">
        <Skeleton className="mb-6 h-8 w-[250px]" />
        <div className="prose prose-slate max-w-none">
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
    </main>
  )
}
