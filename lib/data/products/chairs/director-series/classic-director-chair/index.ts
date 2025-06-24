import { ExtendedProductData } from "@/lib/data/product-types";

const classicDirectorChair: ExtendedProductData = {
  id: 'classic-director-chair',
  name: 'Classic Director Chair',
  description: 'Traditional folding director chair with a timeless design.',
  category: 'chairs',
  seriesId: 'director-series',
  imageUrl: '/images/products/chairs/classic-director-chair.jpg',
  features: [
    'Premium canvas seating',
    'Solid wood frame',
    'Foldable for easy storage',
    'Brass hardware accents',
    'Side table attachment'
  ],
  specifications: {
    'Material': 'Hardwood, canvas',
    'Weight Capacity': '250 lbs',
    'Dimensions': '24"W x 22"D x 36"H',
    'Warranty': '5 years'
  },
  variants: [
    {
      variantId: 'natural',
      variantName: 'Natural Finish',
      name: 'Classic Director Chair - Natural',
      description: 'Light wood finish with tan canvas',
      imageUrl: '/images/products/chairs/classic-director-chair-natural.jpg'
    },
    {
      variantId: 'walnut',
      variantName: 'Walnut Finish',
      name: 'Classic Director Chair - Walnut',
      description: 'Dark walnut finish with black canvas',
      imageUrl: '/images/products/chairs/classic-director-chair-walnut.jpg'
    }
  ]
};

export default classicDirectorChair;
