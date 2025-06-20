# Task 23: Fix Image Loading Issue on Chair Detail Pages

## Implementation Plan

Based on Task 23 in the task-master-ai.json file, we need to address the issue where chair images don't display on initial page load. This document outlines our implementation approach.

### 1. Default Variant Selection

**Problem:** No image is displayed on initial page load because no variant is selected by default.

**Solution:**
- Implement a useEffect hook to select the first variant as the default when the component mounts
- Update state management to ensure a variant is always selected
- Add proper type safety for the variant selection

```tsx
// Implementation approach
useEffect(() => {
  if (product?.variants && product.variants.length > 0 && !selectedVariant) {
    setSelectedVariant(product.variants[0]);
  }
}, [product, selectedVariant]);
```

### 2. Image Path Resolution

**Problem:** Inconsistent image path construction leads to missing images.

**Solution:**
- Create a consistent function for resolving image paths
- Implement proper fallback mechanisms for missing images
- Use absolute Cloudinary URLs for all images

```tsx
// Implementation approach
const getImageUrl = () => {
  if (selectedVariant?.images && selectedVariant.images.length > 0) {
    return selectedVariant.images[0];
  }
  
  if (product?.images && product.images.length > 0) {
    return product.images[0];
  }
  
  return `https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/${chairName}/default.jpg`;
};
```

### 3. Visual Enhancements

**Problem:** Image container lacks visual appeal and brand identity.

**Solution:**
- Add a decorative rectangle in one corner of the image box
- Use brand red color (#B91C1C) for variant button text
- Add subtle border around the image container

```tsx
// Implementation approach for decorative element
<div className="absolute top-0 right-0 w-16 h-16 bg-red-700/10 z-10" />
```

### 4. Error Handling

**Problem:** No graceful handling of image loading failures.

**Solution:**
- Add onError handler for images to fall back to a default image
- Implement loading state while images are being fetched
- Add consistent error logging for debugging

```tsx
// Implementation approach for error handling
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
    console.error(`Failed to load image: ${imageUrl}`);
  }}
/>
```

## Implementation Steps

1. Create a ProductImageGallery component with proper default variant selection
2. Implement consistent image URL resolution with fallbacks
3. Add visual enhancements (decorative rectangle, brand colors)
4. Implement proper error handling and loading states
5. Update all chair detail pages to use the new component
6. Test across all chair variants to ensure consistent behavior

## Success Criteria

- Images appear immediately on initial page load for all chair detail pages
- Consistent visual styling across all chair models
- Proper error handling for missing images
- Enhanced visual appearance with brand identity elements