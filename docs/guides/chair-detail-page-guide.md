# Chair Detail Page Component Guide

This document provides a comprehensive guide for the chair detail page implementation, focusing on the image display and variant selection components.

## Component Architecture

The chair detail page follows a modular structure with these key components:

1. **ProductDetailPage**: Main container component
2. **ProductImageGallery**: Handles image display and thumbnail navigation
3. **VariantSelector**: Manages variant selection
4. **FeaturesList**: Displays product features
5. **ContactButtonWithVariant**: Call-to-action with selected variant information

## Image Display Implementation

### Key Features

- **Default Image Loading**: Ensures an image is always displayed on initial load
- **Variant-Specific Images**: Shows different images based on selected variant
- **Decorative Elements**: Includes a decorative rectangle in one corner
- **Error Handling**: Provides fallbacks for missing images

### Implementation Details

#### Default Variant Selection

```tsx
// Default variant selection on component mount
useEffect(() => {
  if (product?.variants && product.variants.length > 0 && !selectedVariant) {
    setSelectedVariant(product.variants[0]);
  }
}, [product, selectedVariant]);
```

#### Image URL Resolution

```tsx
// Image URL resolution with fallbacks
const getImageUrl = useCallback(() => {
  if (selectedVariant?.images && selectedVariant.images.length > 0) {
    return selectedVariant.images[0];
  }
  
  if (product?.images && product.images.length > 0) {
    return product.images[0];
  }
  
  // Construct a default Cloudinary URL based on chair name
  return `https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/${chairName}/default.jpg`;
}, [selectedVariant, product, chairName]);
```

#### Image Container Component

```tsx
const ProductImageGallery = ({ 
  product,
  selectedVariant,
  onVariantChange
}: ProductImageGalleryProps) => {
  const imageUrl = getImageUrl();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className="relative w-full h-[500px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
      {/* Decorative rectangle */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-red-700/10 z-10" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={imageUrl}
        alt={`${product.name} - ${selectedVariant?.variantName || 'Main'}`}
        fill
        priority
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-gray-500">Image could not be loaded</p>
          <p className="text-sm text-gray-400">Please try again later</p>
        </div>
      )}
      
      {/* Variant thumbnails */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        {product.variants.map((variant) => (
          <button
            key={variant.variantId}
            onClick={() => onVariantChange(variant)}
            className={`relative w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${
              selectedVariant?.variantId === variant.variantId
                ? 'border-red-600 shadow-md'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <Image
              src={variant.images[0] || imageUrl}
              alt={variant.variantName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
```

## Variant Selection Implementation

### Key Features

- **Brand Red Text**: Uses SteelMade's brand red for variant button text
- **Visual Feedback**: Clear indication of selected variant
- **Consistent Styling**: Standardized button appearance
- **Accessibility**: Proper ARIA attributes for screen readers

### Implementation Details

```tsx
const VariantSelector = ({ 
  variants,
  selectedVariant,
  onVariantChange
}: VariantSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Available Variants</h3>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <button
            key={variant.variantId}
            onClick={() => onVariantChange(variant)}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedVariant?.variantId === variant.variantId
                ? 'bg-red-700 text-white'
                : 'bg-gray-100 text-red-700 hover:bg-gray-200'
            }`}
            aria-pressed={selectedVariant?.variantId === variant.variantId}
          >
            {variant.variantName}
          </button>
        ))}
      </div>
    </div>
  );
};
```

## Features List Implementation

### Key Features

- **Consistent Grid Layout**: Same layout across all chair models
- **Numbered Indicators**: Uses numbered items instead of bullets
- **Brand Accent Colors**: Incorporates brand red for numbering
- **Responsive Design**: Adapts to different screen sizes

### Implementation Details

```tsx
const FeaturesList = ({ features }: { features: string[] }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-800 text-sm mr-2">
              {index + 1}
            </span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Complete Page Component

```tsx
const ProductDetailPage = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const chairName = getChairNameFromSlug(product.slug);
  
  // Set default variant on mount
  useEffect(() => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image section */}
        <ProductImageGallery
          product={product}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
        
        {/* Product details section */}
        <div>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
          
          <FeaturesList features={product.features || []} />
          
          <ContactButtonWithVariant
            selectedVariant={selectedVariant}
            onContactClick={() => {/* Handle contact form */}}
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
};
```

## Best Practices

1. **Default Selection**: Always select a default variant on component mount
2. **Fallback Mechanisms**: Provide fallbacks for all potential null/undefined values
3. **Loading States**: Show loading indicators while images are being fetched
4. **Error Handling**: Gracefully handle image loading errors
5. **Consistent Styling**: Use the same styling patterns across all chair models
6. **Responsive Design**: Ensure proper display on all device sizes
7. **Accessibility**: Include proper ARIA attributes and keyboard navigation

By following these implementation guidelines, all chair detail pages will maintain consistent styling, behavior, and user experience while providing optimal image loading and variant selection.