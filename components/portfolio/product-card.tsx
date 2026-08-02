"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Product } from "./types";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <div className="relative aspect-video">
        <Image 
          src={product.imageUrl} 
          alt={product.title} 
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          priority
        />
      </div>
      <CardContent className="p-4">
        <h4 className="font-medium text-lg bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          {product.title}
        </h4>
        <p className="text-muted-foreground text-sm mt-1 mb-3 line-clamp-2">
          {product.description}
        </p>
        <Link 
          href={`/products/${product.id}`} 
          className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
}
