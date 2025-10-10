'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Gauge, Info, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductVariant } from '@/modules/product/types';
import { EnhancedVariantSelector } from './EnhancedVariantSelector';
import { EnhancedProductFeatures } from './EnhancedProductFeatures';

/**
 * Props for the EnhancedProductDetailLayout component
 */
interface EnhancedProductDetailLayoutProps {
  product: Product | null;
}

/**
 * EnhancedProductDetailLayout component for displaying product details with consistent styling
 */
export function EnhancedProductDetailLayout({ product }: EnhancedProductDetailLayoutProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
    
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Product Not Found</h2>
          <p className="text-red-600 dark:text-red-300">Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    
    // Update main image if the variant has images
    if (variant.images && variant.images.length > 0) {
      setMainImage(variant.images[0]);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/chairs/director-series" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Director Series
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md mb-6 aspect-square relative">
              {/* Decorative rectangle in the top-right corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-700 opacity-10 rounded-bl-3xl z-10"></div>
              
              {mainImage && (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            
            {product.variants && product.variants.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant) => (
                  variant.images && variant.images.length > 0 && (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-red-700 dark:border-red-500 shadow-md'
                          : 'border-transparent hover:border-red-300 dark:hover:border-red-800'
                      }`}
                    >
                      <Image
                        src={variant.images[0]}
                        alt={variant.variantName}
                        fill
                        className="object-contain p-1"
                        sizes="(max-width: 768px) 25vw, 10vw"
                      />
                    </button>
                  )
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                  Premium Collection
                </span>
                <span className="mx-4 h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Code: {selectedVariant?.variantId || '-'}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>
              
              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Available Variants</h2>
                  <EnhancedVariantSelector
                    variants={product.variants}
                    selectedVariant={selectedVariant}
                    onChange={handleVariantChange}
                  />
                </div>
              )}
                {/* Features */}
              {product.features && product.features.length > 0 && (
                <EnhancedProductFeatures features={product.features} />
              )}
              
              {/* Contact Button */}
              <button className="w-full bg-red-700 hover:bg-red-800 text-white py-3 px-8 rounded-lg font-semibold shadow-sm transition-colors flex items-center justify-center">
                <Info className="mr-2 h-5 w-5" />
                Contact Us About This Product
              </button>
            </div>

            {/* Warranty Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-red-700 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Premium Warranty</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All our director chairs come with a comprehensive warranty against manufacturing defects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* About Director Series Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About the Director Series</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              The Director Series represents our premium line of executive seating, designed for professionals who demand 
              both comfort and style. Each chair in this collection features premium materials, ergonomic design, 
              and exceptional craftsmanship.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <Gauge className="h-5 w-5 text-red-700 dark:text-red-400 mr-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Premium Quality</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Only the finest materials are used in our Director Series, ensuring durability and a premium feel.
                </p>
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <Check className="h-5 w-5 text-red-700 dark:text-red-400 mr-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Ergonomic Design</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Engineered for comfort during long work sessions with proper support for your back and posture.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EnhancedProductDetailLayout;