"use client";

import { ErrorBoundaryWrapper } from '@/components/error-boundary/client-error-boundary';
import { CollectionsGrid } from './CollectionsGrid';
import type { ProductType } from '@/types/products';
import type { SubCategoryCollections, EmptySubCategoryCollection, SubCategoryCollection } from '@/types/collections';

interface ProtectedCollectionsGridProps {
  type: ProductType;
  collections: SubCategoryCollections | EmptySubCategoryCollection;
}

export function ProtectedCollectionsGrid({ type, collections }: ProtectedCollectionsGridProps) {
  let collectionsArray: SubCategoryCollection[];

  if (!collections || typeof collections.id === 'string') { // Check if it's EmptySubCategoryCollection or undefined/null
    collectionsArray = [];
  } else {
    // It's SubCategoryCollections (ProductCategories), so convert to array
    collectionsArray = Object.values(collections);
  }

  return (
    <ErrorBoundaryWrapper>
      <CollectionsGrid productType={type} collections={collectionsArray} />
    </ErrorBoundaryWrapper>
  );
}
