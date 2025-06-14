import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CollectionsNotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tighter">
          Collections Not Found
        </h1>
        <p className="text-muted-foreground">
          The collections you&apos;re looking for could not be found.
          Please check our available collections or try again later.
        </p>
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/collections">View All Collections</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
