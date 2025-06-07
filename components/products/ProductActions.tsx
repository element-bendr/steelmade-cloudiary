"use client"

import { useState } from "react"
import { ContactButtonWithVariant } from "@/components/products/ContactButtonWithVariant"

interface Variant {
  id: string;
  name: string;
}

interface Product {
  name: string;
}

interface ProductActionsProps {
  product: Product;
  variants: Variant[];
}

// Sample integration in a product detail page
export function ProductActions({ product, variants }: ProductActionsProps) {
  // State to track the selected variant
  const [selectedVariant, setSelectedVariant] = useState(variants?.length ? variants[0] : null)
  
  // Handle contact button click
  const handleContactClick = () => {
    // Open contact form/modal with product and variant info
    console.log("Contact us about:", product.name, selectedVariant?.name)
  }
  
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
        selectedVariant={selectedVariant}
        onContactClick={handleContactClick}
      />
    </div>
  )
}