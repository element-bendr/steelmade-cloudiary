import { CollectionsSkeleton } from "@/components/collections/CollectionsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <Skeleton className="h-10 w-3/4 max-w-lg" />
        <Skeleton className="mt-2 h-6 w-2/3" />
      </header>

      <div className="mt-6">
        <CollectionsSkeleton />
      </div>
    </main>
  );
}
