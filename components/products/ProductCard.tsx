import Image from "next/image"
import Link from "next/link"
import type { ExtendedProductData } from '../../lib/data/product-types';
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: ExtendedProductData
  href: string
  className?: string
}

export function ProductCard({ product, href, className }: ProductCardProps) {
  return (
    <Link 
      href={href}
      className={cn("group block overflow-hidden rounded-[2px] transition-all border border-border hover:border-accent h-full bg-card hover:shadow-md", className)}
    >
      <div className="relative aspect-square w-full bg-muted flex items-center justify-center">
        <Image
          src={product.imageUrl || "/images/placeholder-product.webp"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 bg-card">
        <h3 className="text-lg font-semibold leading-tight text-card-foreground group-hover:text-accent">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  )
}