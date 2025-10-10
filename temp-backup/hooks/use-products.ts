"use client"

import { useState, useEffect } from "react"
import { ProductData } from "@/types/products"
import { ProductCategorySlug, isValidCategorySlug } from "@/types/product-categories"

interface UseProductsResult {
  products: ProductData[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useProducts(
  category: ProductCategorySlug,
  seriesId: string,
  initialProducts: ProductData[] = []
): UseProductsResult {
  const [products, setProducts] = useState<ProductData[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(initialProducts.length === 0)
  const [error, setError] = useState<string | null>(null)
  
  const fetchProducts = async () => {
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
  }
  
  const refetch = () => {
    fetchProducts()
  }
  
  useEffect(() => {
    if (initialProducts.length === 0) {
      fetchProducts()
    }
  }, [category, seriesId, initialProducts.length, fetchProducts])
  
  return { products, isLoading, error, refetch }
}