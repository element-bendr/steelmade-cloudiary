import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { body } = await req.json();

    // Ideally, you'd check a signature header here,
    // like sanity/webhook to secure the endpoint

    console.log('Received Sanity webhook:', body);

    // Revalidate everything for now or specifically
    revalidatePath('/', 'layout');

    return NextResponse.json({ message: 'Revalidated safely', now: Date.now() });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}
