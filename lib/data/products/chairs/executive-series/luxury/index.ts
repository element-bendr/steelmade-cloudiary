// NOTE: This product was previously using a factory and registration pattern. Now canonicalized as a single ExtendedProductData object.
import { ExtendedProductData } from '@/lib/data/product-types';

export const luxuryExecutiveChair: ExtendedProductData = {
  id: 'luxury',
  name: 'Luxury Executive Chair',
  description: 'The Luxury Executive Chair is the epitome of opulence and ergonomic mastery, crafted for those who demand the finest in comfort and design.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749801322/steelmade/chairs/executive-series/luxury/ic-40-hb.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749801322/steelmade/chairs/executive-series/luxury/ic-40-hb.jpg', alt: 'Luxury Executive Chair - High Back', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749801328/steelmade/chairs/executive-series/luxury/ic-39-mb.jpg', alt: 'Luxury Executive Chair - Mid Back', width: 800, height: 600 }
  ],
  features: [
    'Sumptuous cushioning with premium upholstery',
    'Polished accents and refined silhouette',
    'Ergonomic support for executive comfort',
    'Available in high-back and mid-back variants',
    'A chair that defines luxury in the modern office'
  ],
  specifications: {},
  variants: [
    {
      variantId: 'luxury-hb',
      variantName: 'High Back',
      name: 'Luxury Executive Chair - High Back',
      description: 'High back variant for maximum support and presence.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749801322/steelmade/chairs/executive-series/luxury/ic-40-hb.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'luxury-mb',
      variantName: 'Mid Back',
      name: 'Luxury Executive Chair - Mid Back',
      description: 'Mid back variant for agile comfort and style.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749801328/steelmade/chairs/executive-series/luxury/ic-39-mb.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};

export default luxuryExecutiveChair;
