import { cn } from "@/lib/utils";

interface ProductCategoryLoadingProps {
  category: string;
  gridClassName?: string;
}

export function ProductCategoryLoading({
  category,
  gridClassName,
}: ProductCategoryLoadingProps) {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-full max-w-2xl bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-200 animate-pulse rounded"
          />
        ))}
      </div>

      {/* Products Grid Skeleton */}
      <div className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        gridClassName
      )}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col space-y-3 rounded-lg border p-4"
          >
            <div className="h-48 w-full bg-gray-200 animate-pulse rounded" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Re-export as default for easier imports in route files
export default ProductCategoryLoading;
