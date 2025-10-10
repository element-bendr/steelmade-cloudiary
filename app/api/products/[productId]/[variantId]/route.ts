import { NextResponse } from 'next/server'
import { getProductsByCategoryAndSeries } from '@/lib/api/products'
import { ProductCategorySlug, isValidCategorySlug } from '@/types/product-categories'

// Configure to use Edge Runtime for improved performance
export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { category: string; seriesId: string } }
) {
  try {
    // Validate that the category is a valid ProductCategorySlug
    if (!isValidCategorySlug(params.category)) {
      return NextResponse.json(
        { error: `Invalid category: ${params.category}` },
        { status: 400 }
      )
    }
    
    const products = await getProductsByCategoryAndSeries(
      params.category as ProductCategorySlug, 
      params.seriesId
    )
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}