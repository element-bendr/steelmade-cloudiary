"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductCategorySlug, getCategoryDisplayName } from "@/types/product-categories";

interface CollectionNavProps {
  currentCategory?: ProductCategorySlug;
}

export function CollectionNav({ currentCategory }: CollectionNavProps) {
  const pathname = usePathname()
  const categories: ProductCategorySlug[] = ["chairs", "tables", "storage", "desks", "lighting", "accessories", "hospital-furniture", "racking-systems", "school-furniture", "storage-solutions", "modular-furniture", "office-accessories"];

  return (
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center gap-2 py-4 overflow-x-auto">
        <Button
          variant={!currentCategory ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/collections">All Collections</Link>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={pathname?.startsWith(`/collections/${category}`) ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link href={`/collections/${category}`}>
              {getCategoryDisplayName(category)}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}