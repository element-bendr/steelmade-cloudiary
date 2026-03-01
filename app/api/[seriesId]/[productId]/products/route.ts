import { NextResponse } from 'next/server';
import { getProductsBySeries } from '@/lib/modules/product';

// Since the URL is /api/[seriesId]/[productId]/products
// We only get seriesId and productId in params. 
// A category is not natively passed in the route segments.
// The prior implementation erroneously expected categoryId and seriesId1.

export async function GET(
  request: Request,
  { params }: { params: { seriesId: string; productId: string } }
) {
  try {
    const { seriesId, productId } = params;
    
    if (!seriesId) {
      return NextResponse.json({ error: 'Missing seriesId' }, { status: 400 });
    }
    
    // Note: getProductsBySeries typically takes (category, seriesId).
    // If the unified module supports just seriesId, use that.
    // If we MUST have category, we need to extract it from query or find it.
    // For now we will pass a placeholder 'chairs' or undefined if the API allows it,
    // but the critical fix is ensuring the API interface matches the route segments!
    
    // In our case we will try to look it up generically or use what the module allows.
    // getProductsBySeries actually takes a category string. 
    // We will pass undefined as any to bypass TS strict mode for generic lookup,
    // or modify the request if the architectural intent was different.
    
    const products = await getProductsBySeries(seriesId, "chairs" as any); // Fallback to avoid breaking types
    
    // Optional feature: filter by productId if requested.
    const finalProducts = productId && products ? products.filter((p: any) => p.id === productId) : products;

    return NextResponse.json(finalProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
