import Image from "next/image"
import Link from "next/link"
import type { ProductData } from "@/types/products"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: ProductData
  href: string
  className?: string
}

export function ProductCard({ product, href, className }: ProductCardProps) {
  return (
    <Link 
      href={href}
      className={cn("group block overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md h-full", 
        className
      )}
    >
      <div className="relative aspect-square w-full bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={product.imageUrl || "/images/placeholder-product.webp"}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight text-gray-800 group-hover:text-red-600">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
        {product.price !== undefined ? (
          <p className="mt-2 text-base font-medium text-gray-900">
            ${Number(product.price).toFixed(2)}
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            Contact for Price
          </p>
        )}
      </div>
    </Link>
  )
}