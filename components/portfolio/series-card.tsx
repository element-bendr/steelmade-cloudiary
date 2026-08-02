"use client";

import React from "react";
import Image from "next/image";
import { Series } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface SeriesCardProps {
  series: Series;
  className?: string;
}

export function SeriesCard({ series, className }: SeriesCardProps) {
  return (
    <Card className={cn("group overflow-hidden", className)}>
      <div className="relative aspect-video">
        <Image 
          src={series.imageUrl} 
          alt={series.title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          {series.title}
        </h3>
        <p className="text-muted-foreground mt-2 mb-4 line-clamp-2">
          {series.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {series.products.map((product) => (
            <span 
              key={product.id} 
              className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full text-xs"
            >
              {product.title}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full hover:bg-red-500 hover:text-white transition-colors"
        >
          Explore Series
        </Button>
      </CardFooter>
    </Card>
  );
}
