"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/products";
import { SubCategoryCollection } from "@/types/collections";
import { ProtectedCollectionsGrid } from "./protected-collections-grid";
import { Suspense } from "react";
import { CollectionsSkeleton } from "./CollectionsSkeleton";

interface CollectionPreviewProps {
  type: ProductType;
  seriesId: string;
  collection: SubCategoryCollection;
}

export function CollectionPreview({ 
  type, 
  seriesId, 
  collection 
}: CollectionPreviewProps) {
  // Create a record with just this series' collection for the grid
  const seriesCollections: Record<string, SubCategoryCollection> = {
    [seriesId]: collection
  };

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Browse Collection</h3>
        <Button asChild variant="outline">
          <Link href={`/${type}/${seriesId}/collections`}>
            View All Collections
          </Link>
        </Button>
      </div>
      
      <Suspense fallback={<CollectionsSkeleton />}>
        <ProtectedCollectionsGrid 
          type={type}
          collections={seriesCollections}
        />
      </Suspense>
    </div>
  );
}
