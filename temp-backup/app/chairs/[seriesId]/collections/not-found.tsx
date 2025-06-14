import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CollectionsNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Collection Not Found</h2>
        <p className="text-muted-foreground text-center max-w-md">
          The collection you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild variant="outline">
          <Link href="/chairs">
            Back to Chairs
          </Link>
        </Button>
      </div>
    </div>
  );
}
