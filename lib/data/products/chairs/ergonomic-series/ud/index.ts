import { ExtendedProductData } from '../../../../product-types';

export const udErgonomicChair: ExtendedProductData = {
  id: 'ud',
  name: 'UD Ergonomic Chair',
  description: 'UD Ergonomic Chair, available in high back and mid back, black and grey variants. Crafted for enduring support and modern office harmony.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425932/steelmade/chairs/ergonomic-series/ud/ic-327-hb-black.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425932/steelmade/chairs/ergonomic-series/ud/ic-327-hb-black.png', alt: 'UD Ergonomic Chair High Back Black', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425915/steelmade/chairs/ergonomic-series/ud/ic-328-mb-black.png', alt: 'UD Ergonomic Chair Mid Back Black', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png', alt: 'UD Ergonomic Chair High Back Grey', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425898/steelmade/chairs/ergonomic-series/ud/ic-330-mb-grey.png', alt: 'UD Ergonomic Chair Mid Back Grey', width: 800, height: 600 }
  ],
  features: [
    'High back and mid back ergonomic support',
    'Premium black and grey finishes',
    'Breathable mesh and memory foam seat',
    'Adjustable lumbar and armrests',
    'Poetic design for modern workspaces'
  ],
  specifications: {
    'Material': 'Premium mesh, memory foam, polymer base',
    'Weight Capacity': '300 lbs',
    'Warranty': '5-year limited warranty'
  },
  variants: [
    {
      variantId: 'ud-hb-black',
      variantName: 'High Back Black',
      name: 'UD Ergonomic Chair - High Back Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425932/steelmade/chairs/ergonomic-series/ud/ic-327-hb-black.png',
      specifications: {
        'Color': 'Black',
        'Backrest': 'High back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'ud-mb-black',
      variantName: 'Mid Back Black',
      name: 'UD Ergonomic Chair - Mid Back Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425915/steelmade/chairs/ergonomic-series/ud/ic-328-mb-black.png',
      specifications: {
        'Color': 'Black',
        'Backrest': 'Mid back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'ud-hb-grey',
      variantName: 'High Back Grey',
      name: 'UD Ergonomic Chair - High Back Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png',
      specifications: {
        'Color': 'Grey',
        'Backrest': 'High back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    },
    {
      variantId: 'ud-mb-grey',
      variantName: 'Mid Back Grey',
      name: 'UD Ergonomic Chair - Mid Back Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425898/steelmade/chairs/ergonomic-series/ud/ic-330-mb-grey.png',
      specifications: {
        'Color': 'Grey',
        'Backrest': 'Mid back ergonomic mesh',
        'Seat': 'Memory foam with premium fabric'
      }
    }
  ]
};
