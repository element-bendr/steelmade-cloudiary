"use client"

import { useState, useEffect, useCallback } from "react"
import type { ExtendedProductData } from "../lib/data/product-types"
import { ProductCategorySlug, isValidCategorySlug } from "../types/product-categories"

interface UseProductsResult {
  products: ExtendedProductData[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useProducts(
  category: ProductCategorySlug,
  seriesId: string,
  initialProducts: ExtendedProductData[] = []
): UseProductsResult {
  const [products, setProducts] = useState<ExtendedProductData[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(initialProducts.length === 0)
  const [error, setError] = useState<string | null>(null)
  
  const fetchProducts = useCallback(async () => {
    if (!category || !seriesId) {
      setError("Missing category or series ID")
      setIsLoading(false)
      return
    }
    
    if (!isValidCategorySlug(category)) {
      setError(`Invalid category: ${category}`)
      setIsLoading(false)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/products?category=${category}&seriesId=${seriesId}`)
      
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status}`)
      }
      
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      console.error("Failed to fetch products:", err)
      setError("Failed to load products. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [category, seriesId])
  
  const refetch = () => {
    fetchProducts()
  }
  
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  
  return { products, isLoading, error, refetch }
}