import { CategoryCollections, SubCategoryCollection, SeriesWithProducts } from "@/types/collections";
import { collections } from "@/lib/data/collections-data";
import type { ProductType } from "@/types/products";

// Helper function to convert SubCategoryCollection to SeriesWithProducts
function convertToSeriesWithProducts(
  seriesId: string,
  collection: SubCategoryCollection
): SeriesWithProducts {
  return {
    seriesId: seriesId, // Changed id to seriesId
    title: collection.metadata.title,
    description: collection.metadata.description,
    seoDescription: collection.metadata.seoDescription,
    coverImage: collection.metadata.coverImage,
    features: collection.metadata.features,
    images: collection.metadata.images,
    lastModified: collection.lastModified ? new Date(collection.lastModified) : new Date(), // Added fallback for lastModified
    products: collection.products || {} // Added fallback for products
  };
}

// Export CollectionsService as a namespace with methods
export const CollectionsService = {
  // Get a specific collection by product type and series ID
  async getCollection(
    productType: ProductType,
    seriesId: string
  ): Promise<SeriesWithProducts | null> {
    const collection = collections[productType]?.[seriesId];
    return collection ? convertToSeriesWithProducts(seriesId, collection) : null;
  },

  // Get all collections for a specific product type
  async getCollectionsByType(
    productType: ProductType
  ): Promise<Record<string, SeriesWithProducts>> {
    const typeCollections = collections[productType];
    if (!typeCollections || Object.keys(typeCollections).length === 0) {
      return {};
    }

    return Object.entries(typeCollections).reduce((acc, [seriesId, collection]) => {
      acc[seriesId] = convertToSeriesWithProducts(seriesId, collection);
      return acc;
    }, {} as Record<string, SeriesWithProducts>);
  },

  // Get featured collections across all product types
  async getFeaturedCollections(): Promise<Record<ProductType, Record<string, SeriesWithProducts>>> {
    return {
      "chairs": await this.getCollectionsByType("chairs"),
      "desks": await this.getCollectionsByType("desks"),
      "storage-solutions": await this.getCollectionsByType("storage-solutions"),
      "hospital-furniture": await this.getCollectionsByType("hospital-furniture"),
      "school-furniture": await this.getCollectionsByType("school-furniture"),
      "racking-systems": await this.getCollectionsByType("racking-systems"),
      "modular-furniture": await this.getCollectionsByType("modular-furniture"),
    };
  },

  // Get collections for a specific type (alias for getCollectionsByType for API consistency)
  async getCollections(type: ProductType): Promise<Record<string, SeriesWithProducts>> {
    return this.getCollectionsByType(type);
  },

  // Clear filters cache for a specific type
  async clearFiltersCache(type: ProductType): Promise<void> {
    // Since we're using static data now, this is a no-op
    // In a real implementation, this would clear any cached filter data
    return Promise.resolve();
  }
}
