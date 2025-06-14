"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { productCategoryDisplayNames, productCategoryPaths } from "@/lib/navigation"
import type { ProductCategory } from "@/types/collections"
import type { ProductType } from "@/types/products"

interface CategoryNavProps {
  currentCategory?: ProductCategory
}

export function CategoryNav({ currentCategory }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-2 mb-8">
      {(Object.entries(productCategoryDisplayNames) as [ProductType, string][]).map(([slug, title]) => (
        <Link
          key={slug}
          href={productCategoryPaths[slug]}
          className="shrink-0"
        >
          <Button
            variant={currentCategory === title ? "default" : "outline"}
            className="whitespace-nowrap"
          >
            {title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}