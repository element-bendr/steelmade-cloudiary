import { NextResponse } from 'next/server';
import { getProductsBySeries } from '@/lib/modules/product';
import { ProductCategorySlug } from '@/types/product-categories';

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string; seriesId: string } }
) {
  try {
    const { categoryId, seriesId } = params;
    
    if (!seriesId || !categoryId) {
      return NextResponse.json({ error: 'Missing categoryId or seriesId' }, { status: 400 });
    }
    
    const products = await getProductsBySeries(seriesId, categoryId as ProductCategorySlug);
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
