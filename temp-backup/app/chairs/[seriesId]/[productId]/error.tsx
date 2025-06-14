'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
        <Link href="/chairs" passHref>
          <Button variant="outline">Back to Chairs</Button>
        </Link>
      </div>
    </div>
  );
}
