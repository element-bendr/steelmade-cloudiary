import { CollectionsSkeleton } from "@/components/collections/CollectionsSkeleton";

export default function CollectionsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-full max-w-md bg-gray-200 animate-pulse rounded"></div>
      </div>
      <CollectionsSkeleton />
    </div>
  );
}
