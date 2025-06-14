import { CollectionsSkeleton } from "@/components/collections/CollectionsSkeleton";

export default function CollectionsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded mt-2 animate-pulse" />
      </div>
      <CollectionsSkeleton />
    </div>
  );
}
