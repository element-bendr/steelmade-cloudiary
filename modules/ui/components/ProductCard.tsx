'use client';

import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Product, getProductDisplayName, findDefaultVariant } from '../../product';
import { UIComponentProps } from '../types';

interface ProductCardProps extends UIComponentProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  buttonLabel?: string;
  showVariantInfo?: boolean;
}

/**
 * ProductCard component
 * 
 * A specialized card component for displaying product information
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onSelectProduct,
  buttonLabel = 'View Details',
  showVariantInfo = true,
  className = '',
  id,
  testId,
  style,
}) => {
  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click handler from firing
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };
  
  const defaultVariant = findDefaultVariant(product);
  const displayName = getProductDisplayName(product, showVariantInfo);
  
  return (
    <Card
      id={id}
      testId={testId}
      className={`product-card ${className}`}
      title={displayName}
      description={product.description}
      imageUrl={product.imageUrl || ''}
      imageAlt={`${product.name} image`}
      variant="elevated"
      onClick={handleCardClick}
      style={style}
    >
      {/* Product details */}
      <div className="product-details">
        {defaultVariant && showVariantInfo && (
          <p className="text-sm text-gray-500 mb-2">
            {defaultVariant.variantName}
          </p>
        )}
        
        {/* Product features (if available) */}
        {product.features && product.features.length > 0 && (
          <div className="mt-2 mb-4">
            <h4 className="text-sm font-semibold">Features:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
              {product.features.length > 3 && (
                <li className="text-red-600">+ {product.features.length - 3} more</li>
              )}
            </ul>
          </div>
        )}
        
        {/* Action button */}
        <div className="mt-4">
          <Button
            label={buttonLabel}
            variant="primary"
            size="medium"
            onClick={handleButtonClick}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};