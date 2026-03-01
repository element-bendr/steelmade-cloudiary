import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const secret = process.env.REVALIDATION_SECRET;

    if (!secret) {
      // Don't leak what configuration is missing
      return NextResponse.json({ message: 'Internal configuration error' }, { status: 500 });
    }

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch(e) {
      body = {};
    }

    // Determine specific paths to invalidate if possible from Sanity webhook payload
    // E.g., assuming body._type exists for Sanity docs
    if (body && body._type) {
        if (body._type === 'product' && body.slug?.current) {
            revalidatePath(`/products/${body.slug.current}`);
            revalidatePath('/'); // Usually home page lists products
        } else if (body._type === 'series') {
            revalidatePath('/collections');
            revalidatePath('/');
        } else {
            // General content change, but try to avoid heavy global invalidation
            revalidatePath('/');
        }
    } else {
        // Fallback or explicit instruction
        revalidatePath('/', 'layout');
    }

    // Return generic success
    return NextResponse.json({ message: 'Revalidated safely', now: Date.now() });

  } catch (error: any) {
    // Avoid returning the raw error message up to the caller
    console.error('Revalidation failed:', error.message);
    return NextResponse.json({ message: 'Handler error' }, { status: 500 });
  }
}
