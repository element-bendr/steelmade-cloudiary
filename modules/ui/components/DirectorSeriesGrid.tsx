'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Product } from '@/modules/product/types';

interface DirectorSeriesGridProps {
  products: Product[];
}

/**
 * DirectorSeriesGrid component for displaying director series products
 * with modern, premium styling and animations
 */
export function DirectorSeriesGrid({
  products,
}: DirectorSeriesGridProps) {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Director Series Chairs
        </h1>
        
        <div className="w-20 h-1 bg-[#B91C1C] mb-6"></div>
        
        <p className="mb-8 text-gray-700 dark:text-gray-300 max-w-3xl text-lg">
          Our Director Series chairs combine premium materials with ergonomic design, perfect for professional environments that demand both style and comfort.
        </p>
      </motion.div>
      
      {/* Product grid with staggered animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id.toString()}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                }
              },
            }}
            // Add a custom data attribute for animation timing
            data-index={index}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-[#B91C1C] text-white text-xs font-bold py-1 px-2 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-[#B91C1C] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                      {product.features.length > 3 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400 italic pl-6">
                          +{product.features.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    {product.variants && product.variants.slice(0, 2).map((variant) => (
                      <span
                        key={variant.variantId}
                        className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded"
                      >
                        {variant.variantName}
                      </span>
                    ))}
                    {product.variants && product.variants.length > 2 && (
                      <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                        +{product.variants.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/chairs/director-series/${product.slug}`}
                    className="inline-flex items-center text-[#B91C1C] hover:text-red-800 dark:hover:text-red-400 font-medium text-sm"
                  >
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Default export for DirectorSeriesGrid component
 */
export default DirectorSeriesGrid;