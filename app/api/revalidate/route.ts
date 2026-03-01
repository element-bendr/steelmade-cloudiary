import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const secret = process.env.REVALIDATION_SECRET;

    // Check if the secret is configured
    if (!secret) {
      console.warn('REVALIDATION_SECRET is not set in environment variables');
      return NextResponse.json({ message: 'Configuration error' }, { status: 500 });
    }

    // Verify token
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch(e) {
      body = {};
    }

    console.log('Received secured revalidation webhook:', body);

    // Revalidate everything or target paths
    revalidatePath('/', 'layout');

    return NextResponse.json({ message: 'Revalidated safely', now: Date.now() });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}
