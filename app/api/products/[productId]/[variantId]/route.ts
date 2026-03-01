import { NextResponse } from 'next/server'
import { collections } from '@/lib/data/collections-data'

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { productId: string; variantId: string } }
) {
  try {
    const { productId, variantId } = params;
    
    // Find the product globally across all categories and series
    for (const category of Object.values(collections)) {
      for (const series of Object.values(category as any)) {
        if (series && (series as any).products && (series as any).products[productId]) {
           const product = (series as any).products[productId];
           // Mock a variant search or return product
           return NextResponse.json({
             product,
             variantInfo: { id: variantId, note: "Variant specific data placeholder" }
           });
        }
      }
    }
    
    return NextResponse.json(
      { error: `Product not found for id: ${productId}` },
      { status: 404 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product variant' },
      { status: 500 }
    )
  }
}
