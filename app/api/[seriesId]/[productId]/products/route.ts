import { NextResponse } from 'next/server';
import { getProductsBySeries } from '@/lib/modules/product';

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string; seriesId1: string } }
) {
  try {
    const { categoryId, seriesId1 } = params;
    const products = await getProductsBySeries(seriesId1, categoryId);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}