import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[50vh] py-16">
      <h2 className="text-3xl font-bold mb-4">Collection Not Found</h2>
      <p className="text-muted-foreground mb-8">
        We couldn&apos;t find the collection you&apos;re looking for.
      </p>
      <Link href="/collections">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Browse All Collections
        </Button>
      </Link>
    </div>
  )
}