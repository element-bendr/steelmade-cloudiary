import React from 'react';
import Image from 'next/image';
import { Chair, ChairVariant } from '@/lib/factories/chairFactory';
import { Button } from '@/components/ui/button';

interface ChairDetailProps {
  chair: Chair;
  selectedVariant: string;
  onVariantChange: (variantId: string) => void;
}

/**
 * Standardized component for displaying chair details
 */
export function ChairDetail({ chair, selectedVariant, onVariantChange }: ChairDetailProps) {
  const currentVariant = chair.variants?.find((v: ChairVariant) => v.id === selectedVariant);
  
  if (!currentVariant) {
    return <div className="text-red-600">Variant not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image section */}
      <div className="relative">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image 
            src={currentVariant.imageUrl || ''}
            alt={`${chair.name} - ${currentVariant.name}`}
            width={400}
            height={400}
            className="object-contain w-full h-full max-w-full max-h-full"
          />
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-700 opacity-20"></div>
        </div>
      </div>

      {/* Product details */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{chair.name}</h1>
        <p className="mt-4 text-gray-700">{chair.description}</p>

        {/* Variants */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Variants</h2>
          <div className="mt-4 space-y-3">
            {chair.variants?.map((variant: ChairVariant) => (
              <button
                key={variant.id}
                onClick={() => onVariantChange(variant.id)}
                className={`block text-left ${
                  selectedVariant === variant.id 
                    ? 'text-red-700 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Features</h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {chair.features?.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-red-700 mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact button */}
        <div className="mt-8">
          <Button className="w-full md:w-auto bg-red-700 hover:bg-red-800">
            Contact for Pricing
          </Button>
          {selectedVariant && (
            <p className="mt-2 text-sm text-gray-500">
              Selected variant: {currentVariant.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}