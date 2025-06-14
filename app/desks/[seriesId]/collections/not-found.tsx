import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">Collection Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          The collection you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/desks">
              Browse All Desks
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
