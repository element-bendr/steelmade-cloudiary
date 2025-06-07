"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the variant type inline since we don't have direct access to the actual type
interface Variant {
  variantId: string
  variantName: string
  description?: string
  [key: string]: any // Allow for additional properties
}

interface ContactButtonWithVariantProps {
  selectedVariant: Variant | null
  onContactClick: () => void
  className?: string
}

export function ContactButtonWithVariant({
  selectedVariant,
  onContactClick,
  className
}: ContactButtonWithVariantProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Button 
        onClick={onContactClick} 
        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
        aria-label={selectedVariant 
          ? `Contact us about ${selectedVariant.variantName}` 
          : "Contact us"}
      >
        {selectedVariant 
          ? `Contact Us About ${selectedVariant.variantName}` 
          : "Contact Us"}
      </Button>
    </div>
  )
}