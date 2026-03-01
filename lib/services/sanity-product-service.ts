import { client } from '../sanity.client'
import {
  categoryByIdQuery,
  productsByCategoryQuery,
  allCategoriesQuery,
} from '../sanity.queries'

/**
 * Interface describing the expected standard shape of a product
 * after mapping from Sanity context to Next.js Context.
 */
export interface MappedProduct {
  id: string
  name: string
  imageUrl: string
  images?: string[] // Optional secondary images
  description: string
  features: string[]
  specifications: Record<string, string>
  [key: string]: any // allow dynamic fields mapping
}

export interface MappedSeries {
  id: string
  title: string
  description?: string
  image?: string
  href?: string
  products: Record<string, MappedProduct>
}

export interface MappedCategory {
  id: string
  name: string
  description: string
  imageUrl?: string
  series: Record<string, MappedSeries>
}

/**
 * Centralized service to handle dynamic Sanity data fetching and mapping
 */
export class SanityProductService {
  /**
   * Fetches an individual mapped Category including all its populated Series and nested Products.
   */
  static async getCategoryWithProducts(categoryId: string): Promise<MappedCategory | null> {
    try {
      // 1. Fetch the raw category metadata wrapper
      let categoryData = await client.fetch(categoryByIdQuery, { categoryId })
      
      // 2. Fetch all products under this category
      const rawProducts = await client.fetch(productsByCategoryQuery, { categoryId })

      // If no category document exists, but products exist for this category, 
      // dynamically create an on-the-fly category proxy.
      if (!categoryData) {
        if (rawProducts.length > 0) {
          const proxyName = categoryId
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
          categoryData = {
            id: categoryId,
            name: proxyName,
            description: `Explore our premium ${proxyName} collection.`
          };
        } else {
          return null; // Return null only if BOTH category doc is missing AND no products found
        }
      }
      
      // 3. Transform the flat product list into the hierarchical format expected by Next.js components
      const seriesMap: Record<string, MappedSeries> = {}

      rawProducts.forEach((prod: any) => {
        const rawSeries = prod.series || 'general'
        const seriesKey = rawSeries.toLowerCase().replace(/\s+/g, '-')
        
        // Initialize the series if it doesn't exist yet
        if (!seriesMap[seriesKey]) {
          seriesMap[seriesKey] = {
            id: seriesKey,
            title: rawSeries,
            href: `/${categoryId}/${seriesKey}`,
            products: {}
          }
        }

        // Convert Sanity specifications array [{name: "Armrest", value: "3D"}] to Record<string,string> {"Armrest": "3D"}
        const specsMap: Record<string, string> = {}
        if (Array.isArray(prod.specifications)) {
          prod.specifications.forEach((spec: any) => {
            if (spec.name && spec.value) {
              specsMap[spec.name] = spec.value
            }
          })
        }

        // Map the product and assign into the Series Map
        seriesMap[seriesKey].products[prod.id] = {
          id: prod.id,
          name: prod.name,
          imageUrl: prod.imageUrl,
          description: prod.description || '',
          features: prod.features || [],
          specifications: specsMap
        }
      })

      return {
        id: categoryData.id,
        name: categoryData.name,
        description: categoryData.description || '',
        imageUrl: categoryData.imageUrl,
        series: seriesMap
      }
    } catch (error) {
      console.error(`[SanityProductService] Failed fetching category ${categoryId}:`, error)
      return null
    }
  }

  /**
   * Returns shallow metadata for all categories
   */
  static async getAllCategoryPaths() {
    return await client.fetch(allCategoriesQuery)
  }
}
