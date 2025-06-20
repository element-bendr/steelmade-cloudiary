import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/modules/product';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    const product = await getProductById(productId);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}