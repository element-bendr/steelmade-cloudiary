import { ExtendedProductData } from "@/lib/data/product-types";

export const jetLazerComputerExecutiveChair: ExtendedProductData = {
  id: 'jet-lazer-computer',
  name: 'Jet / Lazer / Computer Executive Chair',
  description: 'A trio of executive chairs: Jet, Lazer, and Computer, each crafted for ergonomic comfort and modern office aesthetics.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750410574/steelmade/chairs/executive-series/jet/ic-83-lb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750410574/steelmade/chairs/executive-series/jet/ic-83-lb.jpg',
      alt: 'Jet Executive Chair',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750410580/steelmade/chairs/executive-series/lazer/ic-85-lb.jpg',
      alt: 'Lazer Executive Chair',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750410587/steelmade/chairs/executive-series/computer/ic-86.jpg',
      alt: 'Computer Executive Chair',
    }
  ],
  variants: [
    {
      variantId: 'jet',
      variantName: 'Jet',
      name: 'Jet',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750410574/steelmade/chairs/executive-series/jet/ic-83-lb.jpg',
    },
    {
      variantId: 'lazer',
      variantName: 'Lazer',
      name: 'Lazer',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750410580/steelmade/chairs/executive-series/lazer/ic-85-lb.jpg',
    },
    {
      variantId: 'computer',
      variantName: 'Computer',
      name: 'Computer',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750410587/steelmade/chairs/executive-series/computer/ic-86.jpg',
    }
  ],
  features: [
    'Ergonomic design for all-day comfort',
    'Premium upholstery and finish',
    'Adjustable height and tilt',
    'Durable base and smooth-rolling casters',
    'Distinctive style for modern offices'
  ],
  specifications: {
    material: 'High-grade synthetic leather, steel base',
    colorOptions: 'Black, Brown, Grey',
    weightCapacity: '120kg',
    warranty: '1 year',
  },
};
