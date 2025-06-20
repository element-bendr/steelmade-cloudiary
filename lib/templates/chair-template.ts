import { ExtendedProductData } from "@/lib/data/product-types";

/**
 * Template for creating a new chair in the Director Series
 * Copy this template and replace the values with your chair's details
 */
export const newChairTemplate: ExtendedProductData = {
  id: 'new-chair-id', // Unique ID (use kebab-case)
  name: 'New Chair Name', // Display name
  description: 'Detailed description of the chair',
  price: '0.00', // Price as string with decimal places
  category: 'chairs', // Keep as 'chairs'
  seriesId: 'director-series', // For director series chairs
  inStock: true, // Availability status
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/chair-name/default-image.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/chair-name/image1.jpg',
      alt: 'Description of image 1',
      width: 800,
      height: 600
    },
    // Add more images as needed
  ],
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    // Add more features
  ],
  specifications: {
    'Material': 'Material description',
    'Weight Capacity': 'Weight capacity',
    'Dimensions': 'Dimensions',
    'Warranty': 'Warranty details'
  },
  variants: [
    {
      variantId: 'variant-1-id', // Usually something like 'ic-123-hb'
      variantName: 'Variant 1 Name', // Like 'High Back'
      name: 'Full name of variant 1', // Full product name with variant
      description: 'Description of variant 1',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/chair-name/variant1.jpg',
      specifications: {
        'Specific Spec': 'Value',
        // Add more specifications
      }
    },
    // Add more variants as needed
  ]
};