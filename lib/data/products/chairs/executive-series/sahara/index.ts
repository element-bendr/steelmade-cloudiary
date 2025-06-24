// NOTE: This product was previously using a factory and registration pattern. Now canonicalized as a single ExtendedProductData object.
import { ExtendedProductData } from '@/lib/data/product-types';

export const saharaExecutiveChair: ExtendedProductData = {
  id: 'sahara',
  name: 'Sahara Executive Chair',
  description: 'The Sahara Executive Chair offers a blend of desert-inspired elegance and ergonomic comfort, available in high-back and mid-back variants.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg', alt: 'Sahara Executive Chair - High Back', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799359/steelmade/chairs/executive-series/sahara/ic-45-mb.jpg', alt: 'Sahara Executive Chair - Mid Back', width: 800, height: 600 }
  ],
  features: [
    'Desert-inspired design',
    'Premium upholstery',
    'Ergonomic support',
    'Available in high-back and mid-back variants'
  ],
  specifications: {},
  variants: [
    {
      variantId: 'sahara-hb',
      variantName: 'High Back',
      name: 'Sahara Executive Chair - High Back',
      description: 'High back variant for maximum support and presence.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'sahara-mb',
      variantName: 'Mid Back',
      name: 'Sahara Executive Chair - Mid Back',
      description: 'Mid back variant for agile comfort and style.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799359/steelmade/chairs/executive-series/sahara/ic-45-mb.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
