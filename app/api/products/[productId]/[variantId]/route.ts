import { NextResponse } from 'next/server'
import { collections } from '@/lib/data/collections-data'
import { ExtendedProductData, ProductVariant } from '@/lib/data/product-types'

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { productId: string; variantId: string } }
) {
  try {
    const { productId, variantId } = params;
    
    // Find the product globally across all categories and series
    let targetProduct: ExtendedProductData | null = null;

    for (const category of Object.values(collections)) {
      if (targetProduct) break;
      for (const series of Object.values(category as any)) {
        if (series && (series as any).products && (series as any).products[productId]) {
           targetProduct = (series as any).products[productId] as ExtendedProductData;
           break;
        }
      }
    }

    if (!targetProduct) {
      return NextResponse.json({ error: `Product not found for id: ${productId}` }, { status: 404 });
    }

    // Try to find the specific variant in the product's features/variants array if applicable.
    // If we have an array of variants (some legacy structures support this or we map it), try resolving it.
    let specificVariant = null;

    // Use feature mapping as a mock placeholder for variant definition if explicit 'variants' is missing
    const extractedVariants: ProductVariant[] = (targetProduct.features || []).map((feature, i) => ({
      id: `${productId}-v${i}`,
      variantId: `v${i}`,
      name: feature,
      imageUrl: targetProduct?.imageUrl || ''
    }));

    if (extractedVariants && Array.isArray(extractedVariants)) {
        specificVariant = extractedVariants.find(v => v.variantId === variantId || v.id === variantId);
    }

    if (!specificVariant) {
        return NextResponse.json({ error: `Variant ${variantId} not found for product ${productId}` }, { status: 404 });
    }

    return NextResponse.json({
        product: targetProduct,
        variant: specificVariant
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product variant configuration' },
      { status: 500 }
    )
  }
}
