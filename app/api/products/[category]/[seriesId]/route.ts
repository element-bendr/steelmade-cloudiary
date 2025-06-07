import { NextResponse } from 'next/server'
import { getProductsByCategoryAndSeries } from '@/lib/api/products'
import type { ProductCategory } from '@/types/collections'

// Configure to use Edge Runtime for improved performance
export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { category: ProductCategory; seriesId: string } }
) {
  try {
    const products = await getProductsByCategoryAndSeries(params.category, params.seriesId)
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}