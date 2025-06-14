import type { SubCategoryCollections, EmptySubCategoryCollection } from "@/types/collections";

// Type guard for checking if a collection is empty
export function isEmptyCollection(
  collection: SubCategoryCollections | EmptySubCategoryCollection
): collection is EmptySubCategoryCollection {
  return Object.keys(collection).length === 0;
}
