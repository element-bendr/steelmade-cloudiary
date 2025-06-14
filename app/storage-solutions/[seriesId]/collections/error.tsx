"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
        <h2 className="text-lg font-semibold text-destructive">
          Something went wrong loading the collections
        </h2>
        <p className="mt-2 text-muted-foreground">
          {error.message || "An unexpected error occurred"}
        </p>
        <Button
          onClick={reset}
          variant="outline"
          className="mt-4"
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
