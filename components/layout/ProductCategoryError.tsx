'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ProductCategoryErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  category: string;
  customMessage?: string;
}

export function ProductCategoryError({
  error,
  reset,
  category,
  customMessage,
}: ProductCategoryErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tighter">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground">
          {customMessage || `There was an error loading the ${category.toLowerCase()}. Please try again.`}
        </p>
      </div>
      <Button onClick={reset} variant="default">Try again</Button>
    </div>
  );
}

// Re-export as default for easier imports in route files
export default ProductCategoryError;
