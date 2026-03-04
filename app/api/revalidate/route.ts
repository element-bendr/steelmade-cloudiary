import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getRevalidationSecrets, isAuthorizedRevalidationRequest } from '@/lib/revalidation-auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const requestAuth = {
      authorizationHeader: req.headers.get('authorization'),
      secretHeader: req.headers.get('x-revalidation-secret'),
    };
    const secrets = getRevalidationSecrets();

    if (secrets.length === 0) {
      return NextResponse.json({ message: 'Internal configuration error' }, { status: 500 });
    }

    if (!isAuthorizedRevalidationRequest(requestAuth, secrets)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch(e) {
      body = {};
    }

    if (body && body._type) {
        if (body._type === 'product' && body.slug?.current) {
            // Revalidate specific dynamic routes utilizing this product
            if (body.category && body.series) {
               revalidatePath(`/${body.category}/${body.series}/${body.slug.current}`);
               revalidatePath(`/${body.category}/${body.series}`);
            }
            revalidatePath(`/${body.category}`);
            revalidatePath('/'); 
        } else if (body._type === 'series') {
            if (body.category && body.slug?.current) {
                revalidatePath(`/${body.category}/${body.slug.current}`);
            }
            revalidatePath('/');
        } else if (body._type === 'category' && body.slug?.current) {
            revalidatePath(`/${body.slug.current}`);
            revalidatePath('/');
        } else {
            revalidatePath('/', 'layout');
        }
    } else {
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({ message: 'Revalidated safely', now: Date.now() });

  } catch (error: any) {
    console.error('Revalidation failed:', error.message);
    return NextResponse.json({ message: 'Handler error' }, { status: 500 });
  }
}
