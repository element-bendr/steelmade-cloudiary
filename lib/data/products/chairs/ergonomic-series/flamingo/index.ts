import { ExtendedProductData } from '../../../../product-types';

export const flamingoErgonomicChair: ExtendedProductData = {
  id: 'flamingo-ergonomic-chair',
  name: 'Flamingo Ergonomic Chair',
  description: 'Vibrant ergonomic chair with multiple color options and advanced comfort features.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682616/steelmade/chairs/ergonomic-series/flamingo/ic-335-hb-black.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682616/steelmade/chairs/ergonomic-series/flamingo/ic-335-hb-black.jpg', alt: 'Flamingo Ergonomic Chair - Black', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682616/steelmade/chairs/ergonomic-series/flamingo/ic-337-hb-orange.jpg', alt: 'Flamingo Ergonomic Chair - Orange', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682614/steelmade/chairs/ergonomic-series/flamingo/ic-337-hb-green.jpg', alt: 'Flamingo Ergonomic Chair - Green', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682615/steelmade/chairs/ergonomic-series/flamingo/ic-336-hb-grey.jpg', alt: 'Flamingo Ergonomic Chair - Grey', width: 800, height: 600 }
  ],
  features: [
    'Colorful design options',
    'Advanced ergonomic support',
    'High-density foam seat',
    'Adjustable armrests and headrest'
  ],
  specifications: {
    'Material': 'Premium mesh and polymer',
    'Weight Capacity': '300 lbs',
    'Warranty': '5-year limited warranty'
  },
  variants: [
    {
      variantId: 'ic-335-hb-black',
      variantName: 'Black',
      name: 'Flamingo Ergonomic Chair - Black',
      description: 'Flamingo chair in black with ergonomic high-back design.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682616/steelmade/chairs/ergonomic-series/flamingo/ic-335-hb-black.jpg',
      specifications: {
        'Color': 'Black',
        'Backrest': 'High-back ergonomic',
        'Seat': 'High-density foam'
      }
    },
    {
      variantId: 'ic-337-hb-orange',
      variantName: 'Orange',
      name: 'Flamingo Ergonomic Chair - Orange',
      description: 'Flamingo chair in orange with ergonomic high-back design.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682616/steelmade/chairs/ergonomic-series/flamingo/ic-337-hb-orange.jpg',
      specifications: {
        'Color': 'Orange',
        'Backrest': 'High-back ergonomic',
        'Seat': 'High-density foam'
      }
    },
    {
      variantId: 'ic-337-hb-green',
      variantName: 'Green',
      name: 'Flamingo Ergonomic Chair - Green',
      description: 'Flamingo chair in green with ergonomic high-back design.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682614/steelmade/chairs/ergonomic-series/flamingo/ic-337-hb-green.jpg',
      specifications: {
        'Color': 'Green',
        'Backrest': 'High-back ergonomic',
        'Seat': 'High-density foam'
      }
    },
    {
      variantId: 'ic-336-hb-grey',
      variantName: 'Grey',
      name: 'Flamingo Ergonomic Chair - Grey',
      description: 'Flamingo chair in grey with ergonomic high-back design.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750682615/steelmade/chairs/ergonomic-series/flamingo/ic-336-hb-grey.jpg',
      specifications: {
        'Color': 'Grey',
        'Backrest': 'High-back ergonomic',
        'Seat': 'High-density foam'
      }
    }
  ]
};
