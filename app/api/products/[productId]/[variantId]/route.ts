import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { productBySlugQuery } from '@/lib/sanity.queries'

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { productId: string; variantId: string } }
) {
  try {
    const { productId, variantId } = params;
    
    // Fetch directly from sanity using canonical ID (slug)
    const product = await client.fetch(productBySlugQuery, { slug: productId });

    if (!product) {
      return NextResponse.json({ error: `Product not found for id: ${productId}` }, { status: 404 });
    }

    const variants = product.variants || [];
    
    const specificVariant = variants.find((v: any) => v.id === variantId || v.variantId === variantId);

    if (!specificVariant) {
        return NextResponse.json({ error: `Variant ${variantId} not found for product ${productId}` }, { status: 404 });
    }

    // Return the whole combined structure for backwards compat:
    return NextResponse.json({
        product: product,
        variant: specificVariant
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product variant configuration' },
      { status: 500 }
    )
  }
}
