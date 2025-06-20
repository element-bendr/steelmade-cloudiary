"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h2 className="text-2xl font-bold text-red-700 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        We couldn&apos;t load the Woodland Director Chair information. Please try again or return to the main chairs page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} variant="default">
          Try Again
        </Button>
        <Button
          onClick={() => router.push('/chairs/director-series')}
          variant="outline"
        >
          Return to Director Series
        </Button>
      </div>
    </div>
  );
}