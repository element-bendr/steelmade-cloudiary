import Link from "next/link"

export default function DesksNotFound() {
  return (
    <main className="container py-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Desk Series Not Found</h2>
        <p className="text-muted-foreground mb-4">The desk series you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/desks"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          View All Desks
        </Link>
      </div>
    </main>
  )
}
