import { Skeleton } from "@/components/ui/skeleton"

export default function MediaTestLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Skeleton className="h-12 w-64 mb-8" />
      
      {/* Image Grid Loading */}
      <section className="mb-12">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="aspect-video rounded-lg" />
          ))}
        </div>
      </section>

      {/* Video Loading */}
      <section>
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="aspect-video w-full max-w-4xl mx-auto rounded-lg" />
      </section>
    </main>
  )
}
