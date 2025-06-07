'use client';

import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridSkeletonProps {
  items?: number;
}

export default function ProductGridSkeleton({ items = 4 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(items).fill(0).map((_, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <Skeleton className="h-64 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
