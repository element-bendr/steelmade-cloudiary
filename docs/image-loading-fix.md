# Image Loading Issue Investigation

## Issue Description

When loading any director series chair product detail page (ashley, opera, or tycoon), the image box appears empty on initial load. The variant thumbnails are visible, but the main product image doesn't display until a variant is selected.

## Root Cause Analysis

After investigating the code, the following issues were identified:

1. **Missing Default Image Selection**:
   - No image is set as selected by default when the page loads
   - The `currentImageUrl` is only set when a variant is explicitly selected
   - The fallback to `product.images[0]` isn't working properly

2. **Timing Issues**:
   - The initial image loading may be occurring before the component is fully mounted
   - There's no loading state specifically for the image
   - The fallback mechanism isn't handling edge cases properly

3. **Path Resolution Problems**:
   - The image path construction isn't consistent
   - Some paths may be using relative URLs instead of absolute URLs
   - Cloudinary path construction might be inconsistent

## Solution Implementation

1. **Set Default Image on Load**:
   - Ensure a default variant is selected when the component mounts
   - Add a useEffect hook to set the initial selected variant
   - Update the currentImageUrl calculation to always have a valid fallback

2. **Image Loading Improvements**:
   - Add a placeholder or loading state for the image
   - Implement proper error handling for image loading failures
   - Add an onError handler to fall back to a default image

3. **Path Resolution Fixes**:
   - Standardize all image path construction
   - Use absolute URLs for all images
   - Ensure consistent Cloudinary URL format

4. **Visual Improvements**:
   - Add a decorative rectangle element in one corner of the image box
   - Use the brand red color for variant button text
   - Implement a subtle border around the image container

## Implementation Details

```tsx
// Set default variant on mount
useEffect(() => {
  if (product?.variants && product.variants.length > 0 && !selectedVariant) {
    setSelectedVariant(product.variants[0]);
  }
}, [product, selectedVariant]);

// Improved image URL resolution
const currentImageUrl = selectedVariant 
  ? getDirectorChairVariantImageUrl(chairName, selectedVariant.variantId)
  : product.images && product.images.length > 0 
    ? product.images[0] 
    : `https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/${chairName}/default.jpg`;

// Image container with decorative element and proper fallbacks
<div className="relative w-full h-[500px] bg-gray-50">
  {/* Decorative rectangle */}
  <div className="absolute top-0 right-0 w-16 h-16 bg-red-700/10 z-10" />
  
  {currentImageUrl ? (
    <Image
      src={currentImageUrl}
      alt={`${product.name} - ${selectedVariant?.variantName || 'Main'}`}
      fill
      priority
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={(e) => {
        // Fallback to default image on error
        e.currentTarget.src = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/default.jpg';
      }}
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" />
    </div>
  )}
</div>
```

These changes will ensure that all chair product pages consistently display an image on initial load, with proper fallbacks and visual enhancements.