import { ExtendedProductData } from '../../../../product-types';

export const berlinErgonomicChair: ExtendedProductData = {
  id: 'berlin',
  name: 'Berlin Ergonomic Chair',
  description: 'Berlin Ergonomic Chair, available in high back and mid back, white and black variants. Designed for modern comfort and posture support.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/berlin/ic-317-hb-white.webp',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/berlin/ic-317-hb-white.webp', alt: 'Berlin Ergonomic Chair High Back White', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750417808/steelmade/chairs/ergonomic-series/berlin/ic-319-hb-black.jpg', alt: 'Berlin Ergonomic Chair High Back Black', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750417795/steelmade/chairs/ergonomic-series/berlin/ic-318-mb-white.png', alt: 'Berlin Ergonomic Chair Mid Back White', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750417782/steelmade/chairs/ergonomic-series/berlin/ic-320-mb-black.jpg', alt: 'Berlin Ergonomic Chair Mid Back Black', width: 800, height: 600 }
  ],
  features: [
    'High back and mid back ergonomic support',
    'Premium white and black finishes',
    'Breathable mesh and memory foam seat',
    'Adjustable lumbar and armrests',
    'Modern styling for contemporary offices'
  ],
  specifications: {
    'Material': 'Premium mesh, memory foam, polymer base',
    'Weight Capacity': '300 lbs',
    'Warranty': '5-year limited warranty'
  },
  variants: [
    {
      variantId: 'berlin-hb-white',
      variantName: 'High Back White',
      name: 'Berlin Ergonomic Chair - High Back White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/berlin/ic-317-hb-white.webp',
      specifications: {
        'Color': 'White',
        'Backrest': 'High back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'berlin-hb-black',
      variantName: 'High Back Black',
      name: 'Berlin Ergonomic Chair - High Back Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750417808/steelmade/chairs/ergonomic-series/berlin/ic-319-hb-black.jpg',
      specifications: {
        'Color': 'Black',
        'Backrest': 'High back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'berlin-mb-white',
      variantName: 'Mid Back White',
      name: 'Berlin Ergonomic Chair - Mid Back White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750417795/steelmade/chairs/ergonomic-series/berlin/ic-318-mb-white.png',
      specifications: {
        'Color': 'White',
        'Backrest': 'Mid back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'berlin-mb-black',
      variantName: 'Mid Back Black',
      name: 'Berlin Ergonomic Chair - Mid Back Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750417782/steelmade/chairs/ergonomic-series/berlin/ic-320-mb-black.jpg',
      specifications: {
        'Color': 'Black',
        'Backrest': 'Mid back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    }
  ]
};
