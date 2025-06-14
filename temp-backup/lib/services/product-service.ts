import type { ProductType as ImportedProductType, ProductData as ImportedProductData } from "@/types/products"
import type { SeriesMetadata, ProductCategory } from "@/types/collections"
import type { ImageAsset } from "@/types/image-types"
import { MOCK_SERIES, MOCK_PRODUCTS } from "@/lib/data/mock-data"

export type ProductType = ImportedProductType;
export type ProductData = ImportedProductData;

type ProductDataMap = Record<string, ProductData>

// Common image paths
const createImagePath = (series: string, variant: string) => `/images/collections/${series}/${variant}.webp`
const createCoverPath = (series: string) => `/images/collections/${series}-cover.webp`

const createBasicImage = (path: string, alt: string): ImageAsset => ({
  url: path,
  width: 800,
  height: 600,
  alt
})

// Revalidation time in seconds (1 hour)
export function getRevalidateTime(): number {
  return 3600
}

// Get all series data for a product type
export async function getAllSeries(type: ProductCategory): Promise<Record<string, SeriesMetadata>> {
  return MOCK_SERIES[type] || {}
}

// Get specific series by ID
export async function getSeriesById(type: ProductCategory, id: string): Promise<SeriesMetadata | null> {
  return MOCK_SERIES[type]?.[id] || null
}

// Get related series (excluding the current one)
export async function getRelatedSeries(
  type: ProductCategory,
  currentId: string
): Promise<Record<string, SeriesMetadata>> {
  const allSeries = await getAllSeries(type)
  const { [currentId]: _excluded, ...related } = allSeries
  return related
}

// Get last modified date for a series
export async function getLastModified(type: ProductCategory, seriesId: string): Promise<Date> {
  const series = MOCK_SERIES[type]?.[seriesId]
  const lastModifiedValue = series?.lastModified
  if (typeof lastModifiedValue === 'string') {
    return new Date(lastModifiedValue)
  } else if (lastModifiedValue instanceof Date) {
    return lastModifiedValue
  }
  return new Date()
}

// Get all products in a specific series
export async function getSeriesProducts(
  type: ProductCategory,
  seriesId: string
): Promise<ProductDataMap | null> {
  const productsArray = MOCK_PRODUCTS[type]?.[seriesId]
  if (!productsArray) {
    return null
  }
  const productsMap: ProductDataMap = {}
  if (Array.isArray(productsArray)) {
    productsArray.forEach(product => {
      productsMap[product.id] = product
    })
  }
  return productsMap
}

// Get specific product by ID
export async function getProductById(
  type: ProductCategory,
  seriesId: string,
  productId: string
): Promise<ProductData | null> {
  const productsMap = await getSeriesProducts(type, seriesId)
  return productsMap?.[productId] || null
}

// Helper function to get product details, potentially for a product page
export async function getProductFromService(
  categorySlug: ProductCategory,
  seriesSlug: string,
  productSlug: string
): Promise<ProductData | null> {
  const seriesProducts = MOCK_PRODUCTS[categorySlug]?.[seriesSlug]
  if (seriesProducts) {
    return seriesProducts.find(p => p.id === productSlug) || null
  }
  return null
}

// Get category data, including its series and featured products
export async function getCategoryData(categorySlug: ProductCategory): Promise<any | null> {
  const categorySeries = MOCK_SERIES[categorySlug];
  if (!categorySeries) {
    return null;
  }

  const seriesList = Object.values(categorySeries).map(series => ({
    id: series.id,
    title: series.title,
    description: series.description,
    coverImage: series.coverImage,
    productCount: Object.keys(series.products || {}).length, // Calculate product count
    url: `/${categorySlug}/${series.id}`
  }));

  // Consolidate all products from all series in the category for featured products logic
  let allProductsInCategory: ProductData[] = [];
  Object.keys(categorySeries).forEach(seriesId => {
    const products = MOCK_PRODUCTS[categorySlug]?.[seriesId];
    if (products) {
      allProductsInCategory = allProductsInCategory.concat(products);
    }
  });

  // Simple featured products logic: take the first few products from the consolidated list
  // You might want to refine this, e.g., based on a 'featured' flag in product data
  const featuredProducts = allProductsInCategory.slice(0, 4);

  // Attempt to find a general cover image and description for the category
  // This might come from a specific series or a dedicated category entry if you have one
  // For now, let's try to use the first series' details or a default
  const firstSeries = Object.values(categorySeries)[0];

  return {
    slug: categorySlug,
    title: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " "), // Convert slug to title
    description: firstSeries?.seoDescription || `Explore our ${categorySlug} collection.`,
    seoDescription: firstSeries?.seoDescription || `Find the best ${categorySlug} products at SteelMade.`,
    coverImage: firstSeries?.coverImage, // Use cover image of the first series as a fallback
    series: seriesList,
    featuredProducts: featuredProducts,
    // You might want to add a more specific category-level cover image and description in MOCK_SERIES or a new structure
  };
}

// Get all products in a category (across all its series)
export async function getAllProductsInCategory(categorySlug: ProductCategory): Promise<ProductData[]> {
  let allProducts: ProductData[] = [];
  const seriesInCategories = MOCK_PRODUCTS[categorySlug];
  if (seriesInCategories) {
    Object.values(seriesInCategories).forEach(seriesProducts => {
      allProducts = allProducts.concat(seriesProducts);
    });
  }
  return allProducts;
}

// Get product details for product page (replaces getProductById for this specific use case)
export async function getProductDetails(
  categorySlug: ProductCategory,
  seriesSlug: string,
  productSlug: string
): Promise<ProductData | null> {
  const products = MOCK_PRODUCTS[categorySlug]?.[seriesSlug];
  if (products) {
    return products.find(p => p.id === productSlug) || null;
  }
  return null;
}
