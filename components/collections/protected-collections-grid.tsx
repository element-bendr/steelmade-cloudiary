"use client";

import { ErrorBoundaryWrapper } from '../error-boundary/client-error-boundary';
import { CollectionsGrid } from './CollectionsGrid';
import type { ProductType } from '../../lib/data/product-types';

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

// Local type definitions (copied from types/collections.ts to avoid import error)
type SubCategoryCollection = {
  metadata: any;
  series?: any[];
  products?: Record<string, any>;
  priceRange?: { min: string; max: string };
  features?: string[];
  materials?: string[];
  specifications?: any;
  seoDescription?: string;
  coverImage?: any;
  images?: any[];
  lastModified?: string;
  [key: string]: any;
};
type EmptySubCategoryCollection = { id: string; title: string; description: string; lastModified: string };
type SubCategoryCollections = Record<string, SubCategoryCollection>;
