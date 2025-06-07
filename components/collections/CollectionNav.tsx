"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { productCategoryDisplayNames, productCategoryPaths } from "@/lib/navigation"
import type { ProductCategory } from "@/types/collections"
import type { ProductType } from "@/types/products";

interface CollectionNavProps {
  currentCategory?: ProductCategory;
}

export function CollectionNav({ currentCategory }: CollectionNavProps) {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center gap-2 py-4 overflow-x-auto">
        {(Object.keys(productCategoryDisplayNames) as ProductType[]).map((slug) => {
          const label = productCategoryDisplayNames[slug];
          const path = productCategoryPaths[slug];
          return (
            <Link 
              key={slug}
              href={path} // Use the direct path from productCategoryPaths
              className="shrink-0"
            >
              <Button
                variant={pathname?.startsWith(path) ? "default" : "outline"} // Check if pathname starts with the category path
                size="sm"
                className="whitespace-nowrap"
              >
                {label}
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  )
}