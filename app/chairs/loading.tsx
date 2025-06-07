import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChairsLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-[200px]" />
        <Skeleton className="mx-auto h-20 max-w-2xl" />
      </div>

      <section>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-lg border bg-card">
              <Skeleton className="aspect-video w-full" />
              <div className="p-6">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-20" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="rounded-lg bg-muted p-8">
          <Skeleton className="mb-6 h-8 w-[250px]" />
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-2 h-6 w-[150px]" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
