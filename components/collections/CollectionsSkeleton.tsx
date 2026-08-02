export function CollectionsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Filter skeleton */}
        <div className="w-full md:w-auto">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="w-full md:w-auto">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border p-4 space-y-4">
            <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
