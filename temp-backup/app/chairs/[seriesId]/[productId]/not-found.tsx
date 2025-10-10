import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Product Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have been moved or doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/chairs">
          Browse All Chairs
        </Link>
      </Button>
    </div>
  );
}