import { ExtendedProductData } from '../../../../product-types';

export const rogerErgonomicChair: ExtendedProductData = {
  id: 'roger',
  name: 'Roger Ergonomic Chair',
  description: 'Roger Ergonomic Chair, available in high back and mid back, white and black variants. Designed for enduring comfort and modern posture support.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424616/steelmade/chairs/ergonomic-series/roger/ic-321-hb-white.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424616/steelmade/chairs/ergonomic-series/roger/ic-321-hb-white.jpg', alt: 'Roger Ergonomic Chair High Back White', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424632/steelmade/chairs/ergonomic-series/roger/ic-322-mb-white.jpg', alt: 'Roger Ergonomic Chair Mid Back White', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424588/steelmade/chairs/ergonomic-series/roger/ic-323-hb-black.png', alt: 'Roger Ergonomic Chair High Back Black', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424601/steelmade/chairs/ergonomic-series/roger/ic-324-mb-black.png', alt: 'Roger Ergonomic Chair Mid Back Black', width: 800, height: 600 }
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
      variantId: 'roger-hb-white',
      variantName: 'High Back White',
      name: 'Roger Ergonomic Chair - High Back White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424616/steelmade/chairs/ergonomic-series/roger/ic-321-hb-white.jpg',
      specifications: {
        'Color': 'White',
        'Backrest': 'High back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'roger-mb-white',
      variantName: 'Mid Back White',
      name: 'Roger Ergonomic Chair - Mid Back White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424632/steelmade/chairs/ergonomic-series/roger/ic-322-mb-white.jpg',
      specifications: {
        'Color': 'White',
        'Backrest': 'Mid back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'roger-hb-black',
      variantName: 'High Back Black',
      name: 'Roger Ergonomic Chair - High Back Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424588/steelmade/chairs/ergonomic-series/roger/ic-323-hb-black.png',
      specifications: {
        'Color': 'Black',
        'Backrest': 'High back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'roger-mb-black',
      variantName: 'Mid Back Black',
      name: 'Roger Ergonomic Chair - Mid Back Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750424601/steelmade/chairs/ergonomic-series/roger/ic-324-mb-black.png',
      specifications: {
        'Color': 'Black',
        'Backrest': 'Mid back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    }
  ]
};
