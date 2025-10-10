import { NextResponse } from 'next/server';
import { getProductsBySeries } from '@/lib/modules/product';
import { isValidCategorySlug } from '@/types/product-categories-unified';
import type { ProductCategorySlug } from '@/types/product-categories';

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string; seriesId1: string } }
) {
  try {
    const { categoryId, seriesId1 } = params;
    if (!isValidCategorySlug(categoryId)) {
      return NextResponse.json({ error: 'Invalid categoryId' }, { status: 400 });
    }
    const products = await getProductsBySeries(seriesId1, categoryId as ProductCategorySlug);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}