"use client"

import { useState } from "react"
import { ContactButtonWithVariant } from "@/components/products/ContactButtonWithVariant"
// Import the Variant type from our standardized variant type system
import type { ProductVariant as ContactVariant } from "@/types/product-variants-unified" 

// Rename our local Variant interface to prevent conflicts
interface ProductVariant {
  id: string;
  name: string;
}

interface Product {
  name: string;
}

interface ProductActionsProps {
  product: Product;
  variants: ProductVariant[];
}

// Sample integration in a product detail page
export function ProductActions({ product, variants }: ProductActionsProps) {
  // State to track the selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants?.length ? variants[0] : null
  )
  
  // Handle contact button click
  const handleContactClick = () => {
    // Open contact form/modal with product and variant info
    console.log("Contact us about:", product.name, selectedVariant?.name)
  }
  
  // Adapt our ProductVariant to the ContactVariant type expected by ContactButtonWithVariant
  const adaptedVariant = selectedVariant ? {
    id: selectedVariant.id,
    name: selectedVariant.name
  } as ContactVariant : null;
  
  // Render variant selection and contact button
  return (
    <div className="space-y-6">
      {/* Variant selection UI */}
      {variants?.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Options</h3>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-3 py-2 border rounded-md ${
                  selectedVariant?.id === variant.id 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-background border-input hover:bg-muted'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Contact button */}
      <ContactButtonWithVariant
        selectedVariant={adaptedVariant}
        onContactClick={handleContactClick}
      />
    </div>
  )
}