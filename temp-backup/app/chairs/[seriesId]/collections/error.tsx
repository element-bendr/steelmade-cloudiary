"use client";

import { Button } from "@/components/ui/button";

export default function CollectionsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-destructive">Something went wrong!</h2>
        <p className="text-muted-foreground text-center max-w-md">
          {error.message || "There was an error loading the collections. Please try again."}
        </p>
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  );
}
