import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { productStyles } from '@/lib/styles/productStyles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getCategoryUrl, getProductUrl } from '@/lib/navigation';

// Make sure we're properly importing all chair components
import { 
  ChairVariantSelector, 
  ChairImageDisplay, 
  ChairFeatureList,
  ChairContactButton 
} from '@/components/chairs';

interface ProductDetailLayoutProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    seriesId: string; // Added for breadcrumb logic
    category?: string;
    variants?: Array<{
      id?: string;
      variantId?: string;
      name: string;
      imageUrl: string;
    }>;
    features?: string[];
    gallery?: Array<{
      url: string;
      alt: string;
    }>;
  };
  variantOptions?: {
    initialVariant?: any;
    onVariantChange?: (variant: any) => void;
  };
  contactOptions?: {
    onContactClick?: () => void;
    contactButtonText?: string;
  };
  layoutOptions?: {
    imagePosition?: 'left' | 'right';
    showMetaSection?: boolean;
  };
  renderCustomSection?: () => React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({
  product,
  variantOptions = {},
  contactOptions = {},
  layoutOptions = { imagePosition: 'left', showMetaSection: false },
  renderCustomSection,
  className = '',
  children,
}) => {
  const variants = product.variants || [];
  const defaultVariant = variantOptions.initialVariant || (variants.length > 0 ? variants[0] : null);
  
  const [selectedVariant, setSelectedVariant] = useState<any>(defaultVariant);
  const [showContactForm, setShowContactForm] = useState(false);

  // Ensure we have a selected variant when component mounts
  useEffect(() => {
    if (!selectedVariant && defaultVariant) {
      setSelectedVariant(defaultVariant);
    }
  }, [defaultVariant, selectedVariant]);

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    if (variantOptions.onVariantChange) {
      variantOptions.onVariantChange(variant);
    }
  };

  const handleContactClick = () => {
    setShowContactForm(true);
    if (contactOptions.onContactClick) {
      contactOptions.onContactClick();
    }
  };

  // Handle case where product data is missing
  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-red-700">Product Not Found</h2>
        <p className="mt-4">The requested product could not be loaded.</p>
      </div>
    );
  }

  // Determine which image to display
  const displayImage = selectedVariant?.imageUrl || product.imageUrl;
  const imageAlt = selectedVariant 
    ? `${product.name} - ${selectedVariant.name}` 
    : product.name;
  const imageClass = selectedVariant?.imageClass || '';
  // Create grid layout based on image position
  const gridClasses = layoutOptions.imagePosition === 'right' 
    ? 'grid grid-cols-1 md:grid-cols-2 md:flex md:flex-row-reverse gap-8' 
    : productStyles.layout.grid;

  // Breadcrumb logic
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Chairs', href: getCategoryUrl('chairs') },
  ];
  if (product.seriesId) {
    breadcrumbItems.push({ name: product.seriesId.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()), href: getCategoryUrl('chairs', product.seriesId) });
  }
  breadcrumbItems.push({ name: product.name, href: getProductUrl('chairs', product.seriesId || '', product.id) });

  return (
    <main className={productStyles.layout.container}>
      <Breadcrumbs items={breadcrumbItems} />
      <div className={`${gridClasses} ${className}`}>
        {/* Product Image Section */}
        {displayImage && (
          <ChairImageDisplay 
            imageUrl={displayImage}
            alt={imageAlt}
            className={`w-full ${imageClass}`}
          />
        )}        {/* Product Details Section */}
        <div className={productStyles.layout.section}>
          <h1 className={productStyles.typography.title}>{product.name}</h1>
          <p className={productStyles.typography.description}>{product.description}</p>
          {/* Price display removed as per new design guidelines */}

          {/* Variant Selector */}
          {variants.length > 0 && selectedVariant && (
            <ChairVariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
              className="mt-6"
            />
          )}

          {/* Features Section */}
          {product.features && product.features.length > 0 && (
            <ChairFeatureList 
              features={product.features} 
              className="mt-6"
            />
          )}

          {/* Contact Button */}
          <ChairContactButton
            onClick={handleContactClick}
            selectedVariant={selectedVariant}
            productName={product.name}
            className="mt-6"
          />

          {/* Custom Section */}
          {renderCustomSection && renderCustomSection()}

          {/* Additional Children */}
          {children}
        </div>
      </div>

      {/* Contact Form (simplified) */}
      {showContactForm && selectedVariant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
            <h2 className="text-2xl font-bold">Contact Sales</h2>
            <p>
              Interested in the {product.name} {selectedVariant && `(${selectedVariant.name})`}?
              Fill out the form below and our sales team will get back to you.
            </p>
            <div className="space-y-4">
              <div>
                <label className={productStyles.components.form.label}>Full Name</label>
                <input
                  type="text"
                  className={productStyles.components.form.input}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className={productStyles.components.form.label}>Email</label>
                <input
                  type="email"
                  className={productStyles.components.form.input}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className={productStyles.components.form.label}>Message</label>
                <textarea
                  className={productStyles.components.form.textarea}
                  rows={3}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
              <div className={productStyles.components.form.buttonGroup}>
                <Button type="submit" className={productStyles.components.contactButton.button}>
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailLayout;