import { Skeleton } from "@/components/ui/skeleton"

export default function DeskSeriesLoading() {
  return (
    <main className="container py-12">
      <Skeleton className="h-12 w-64 mb-8" />
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Skeleton className="aspect-square rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
