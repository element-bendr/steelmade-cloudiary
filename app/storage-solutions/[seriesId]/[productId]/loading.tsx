import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs Skeleton */}
      <div className="mb-4">
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery Skeleton */}
        <div>
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded" />
            ))}
          </div>
        </div>

        {/* Product Information Skeleton */}
        <div>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-10 w-1/3 mt-6" />
        </div>
      </div>
    </div>
  );
}
