import { getAllSeries as getAllSeriesUtil, getSeriesById as getSeriesByIdUtil, getProductById as getProductByIdUtil, getAllProducts as getAllProductsUtil } from "../utils/product-utils"
import type { ProductSeries, ExtendedProductData } from '../data/product-types';

// Common image paths
const createImagePath = (series: string, variant: string) => `/images/collections/${series}/${variant}.webp`
const createCoverPath = (series: string) => `/images/collections/${series}-cover.webp`

// Revalidation time in seconds (1 hour)
export function getRevalidateTime(): number {
  return 3600
}

// Get all series data for a product type
export async function getAllSeries(type: string): Promise<Record<string, ProductSeries>> {
  return getAllSeriesUtil(type)
}

// Get specific series by ID
export async function getSeriesById(type: string, id: string): Promise<ProductSeries | null> {
  return getSeriesByIdUtil(type, id) || null
}

// Get related series (excluding the current one)
export async function getRelatedSeries(
  type: string,
  currentId: string
): Promise<Record<string, ProductSeries>> {
  const allSeries = await getAllSeries(type)
  const { [currentId]: _excluded, ...related } = allSeries
  return related
}

// Get last modified date for a series (stub, as modular data may not have this)
export async function getLastModified(type: string, seriesId: string): Promise<Date> {
  // If you add lastModified to your modular data, implement here
  return new Date()
}

// Get all products in a specific series
export async function getSeriesProducts(
  type: string,
  seriesId: string
): Promise<ProductDataMap | null> {
  const series = getSeriesByIdUtil(type, seriesId)
  if (!series || !series.products) return null
  return series.products
}

// Get specific product by ID
export async function getProductById(
  type: string,
  seriesId: string,
  productId: string
): Promise<ExtendedProductData | null> {
  return getProductByIdUtil(type, seriesId, productId) || null
}

// Helper function to get product details, potentially for a product page
export async function getProductFromService(
  categorySlug: string,
  seriesSlug: string,
  productSlug: string
): Promise<ExtendedProductData | null> {
  return getProductByIdUtil(categorySlug, seriesSlug, productSlug) || null
}

// Get category data, including its series and featured products
export async function getCategoryData(categorySlug: string): Promise<any | null> {
  const categorySeries = getAllSeriesUtil(categorySlug)
  if (!categorySeries) {
    return null;
  }

  const seriesList = Object.values(categorySeries).map(series => ({
    id: series.id,
    title: series.title,
    description: series.description,
    // Modular data may not have coverImage; fallback to empty string
    coverImage: (series as any).coverImage || '',
    productCount: Object.keys(series.products || {}).length, // Calculate product count
    url: `/${categorySlug}/${series.id}`
  }));

  // Consolidate all products from all series in the category for featured products logic
  let allProductsInCategory: ExtendedProductData[] = [];
  Object.values(categorySeries).forEach(series => {
    const products = series.products ? Object.values(series.products) : [];
    allProductsInCategory = allProductsInCategory.concat(products);
  });

  // Simple featured products logic: take the first few products from the consolidated list
  const featuredProducts = allProductsInCategory.slice(0, 4);

  // Attempt to find a general cover image and description for the category
  const firstSeries = Object.values(categorySeries)[0];

  return {
    slug: categorySlug,
    title: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " "), // Convert slug to title
    description: firstSeries?.description || `Explore our ${categorySlug} collection.`,
    seoDescription: firstSeries?.description || `Find the best ${categorySlug} products at SteelMade.`,
    coverImage: (firstSeries as any)?.coverImage || '', // Use cover image of the first series as a fallback
    series: seriesList,
    featuredProducts: featuredProducts,
  };
}

// Get all products in a category (across all its series)
export async function getAllProductsInCategory(categorySlug: string): Promise<ExtendedProductData[]> {
  const allProductsObj = getAllProductsUtil(categorySlug)
  return Object.values(allProductsObj)
}

// Get product details for product page (replaces getProductById for this specific use case)
export async function getProductDetails(
  categorySlug: string,
  seriesSlug: string,
  productSlug: string
): Promise<ExtendedProductData | null> {
  return getProductByIdUtil(categorySlug, seriesSlug, productSlug) || null
}

// Type alias for ProductDataMap using ExtendedProductData
type ProductDataMap = Record<string, ExtendedProductData>;
