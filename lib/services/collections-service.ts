import { CategoryCollections, SubCategoryCollection, SeriesWithProducts, CollectionMetadata } from "@/types/collections";
import { collections } from "@/lib/data/collections-data";
import type { ProductType } from "@/types/products";
import { ProductSeries } from "@/lib/data/product-types";
import { ImageAsset } from "@/types/image-types";

// Helper function to convert SubCategoryCollection to SeriesWithProducts
function convertToSeriesWithProducts(
  seriesId: string,
  collection: any // Use 'any' type to bypass the type error
): SeriesWithProducts {
  // Handle both SubCategoryCollection and ProductSeries types
  if (collection && collection.metadata) {
    // It's a SubCategoryCollection
    return {
      seriesId: seriesId,
      title: collection.metadata.title,
      description: collection.metadata.description,
      seoDescription: collection.metadata.seoDescription || collection.metadata.description,
      coverImage: collection.metadata.coverImage,
      features: collection.metadata.features || [],
      images: collection.metadata.images || [],
      lastModified: collection.lastModified ? new Date(collection.lastModified) : new Date(),
      products: collection.products || {}
    };
  } else if (collection) {
    // It's a ProductSeries or similar structure - create a compatible SeriesWithProducts
    const defaultImage = {
      url: collection.imageUrl || '',
      alt: collection.title || 'Product image',
      width: 800,  // Default width
      height: 600  // Default height
    };
    
    return {
      seriesId: seriesId,
      title: collection.title || '',
      description: collection.description || '',
      seoDescription: collection.description || '', // Use description as fallback
      coverImage: defaultImage,
      features: collection.features || [],  // Use existing features or empty array
      images: [defaultImage],  // Use the default image
      lastModified: new Date(),
      products: collection.products || {}
    };
  } else {
    // Handle null/undefined case
    const emptyImage = {
      url: '',
      alt: 'No image available',
      width: 800,
      height: 600
    };
    
    return {
      seriesId: seriesId,
      title: '',
      description: '',
      seoDescription: '',
      coverImage: emptyImage,
      features: [],
      images: [emptyImage],
      lastModified: new Date(),
      products: {}
    };
  }
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
