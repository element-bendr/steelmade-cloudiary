import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, getSeriesByCategoryAndId } from '@/lib/api/products-unified';
import { ProductCategorySlug, isValidCategorySlug } from '@/types/product-categories-unified';
import { ProductCard, UnifiedProductData } from '@/components/products/unified/product-card';
import { VariantSelector, useVariantSelection } from '@/components/products/unified/variant-selector';
import { ContactButton } from '@/components/products/unified/contact-button';
import { ProductVariant } from '@/types/product-variants-unified';

interface ProductPageParams {
  category: ProductCategorySlug;
  seriesId: string;
  productId: string;
}

interface ProductPageProps {
  params: ProductPageParams;
}

/**
 * Generate metadata for the product page
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Validate category
  if (!isValidCategorySlug(params.category)) {
    return {
      title: 'Invalid Category',
      description: 'The requested product category does not exist'
    };
  }
  
  // Get product data
  const product = await getProductById(params.category, params.seriesId, params.productId);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found'
    };
  }
    return {
    title: `${product.name} | SteelMade`,
    description: product.description || 'Product details',
    openGraph: {
      title: `${product.name} | SteelMade`,
      description: product.description || 'Product details',
      type: 'website',
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined
    }
  };
}

/**
 * Product detail page using the unified type system
 */
export default async function ProductPage({ params }: ProductPageProps) {
  // Validate category
  if (!isValidCategorySlug(params.category)) {
    notFound();
  }
  
  // Get product data
  const product = await getProductById(params.category, params.seriesId, params.productId);
  
  if (!product) {
    notFound();
  }
  
  // Get series data
  const series = await getSeriesByCategoryAndId(params.category, params.seriesId);
  
  // Convert to unified product data
  const unifiedProduct: UnifiedProductData = {
    id: product.id,
    name: product.name,
    description: product.description || '',
    imageUrl: product.imageUrl,
    category: params.category,
    seriesId: params.seriesId,
    features: product.features,
    specifications: product.specifications,
    inStock: product.inStock
  };
  
  // Mock variants (would come from product data in real implementation)
  const variants: ProductVariant[] = [
    { id: 'v1', name: 'Standard' },
    { id: 'v2', name: 'Deluxe' },
    { id: 'v3', name: 'Premium' }
  ];
  
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product gallery would go here */}
        <div className="space-y-6">
          {/* Product info */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>
          
          {/* Product actions - client component */}
          <ProductActions 
            product={unifiedProduct} 
            variants={variants}
          />
          
          {/* Product specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Specifications</h2>
              <dl className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-2">
                    <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          
          {/* Product features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="font-bold text-primary">{index + 1}.</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Related products would go here */}
    </div>
  );
}

/**
 * Client component for product actions
 */
function ProductActions({
  product,
  variants
}: {
  product: UnifiedProductData;
  variants: ProductVariant[];
}) {
  'use client';
  
  const { selectedVariant, handleSelectVariant } = useVariantSelection(variants);
  
  const handleContactClick = () => {
    console.log(`Contact about ${product.name}, variant: ${selectedVariant?.name}`);
    // Open contact form/modal
  };
  
  return (
    <div className="space-y-6">
      {/* Variant selector */}
      {variants.length > 0 && (
        <VariantSelector
          variants={variants}
          selectedVariant={selectedVariant}
          onSelectVariant={handleSelectVariant}
        />
      )}
      
      {/* Contact button */}
      <ContactButton
        selectedVariant={selectedVariant}
        onContactClick={handleContactClick}
        buttonText="Request Information"
      />
    </div>
  );
}