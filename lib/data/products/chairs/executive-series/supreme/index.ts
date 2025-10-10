// NOTE: This product was previously using a factory and registration pattern. Now canonicalized as a single ExtendedProductData object.
import { ExtendedProductData } from '@/lib/data/product-types';

export const supremeExecutiveChair: ExtendedProductData = {
  id: 'supreme',
  name: 'Supreme Executive Chair',
  description: 'The Supreme Executive Chair delivers top-tier comfort and authority, available in both high-back and mid-back variants for the ultimate executive experience.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749803024/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749803024/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg.jpg', alt: 'Supreme Executive Chair - High Back', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749803013/steelmade/chairs/executive-series/supreme/ic-56-mb.jpg.jpg', alt: 'Supreme Executive Chair - Mid Back', width: 800, height: 600 }
  ],
  features: [
    'Top-tier executive design',
    'Plush, ergonomic cushioning',
    'Available in high-back and mid-back variants',
    'A chair for those who demand the best'
  ],
  specifications: {},
  variants: [
    {
      variantId: 'supreme-hb',
      variantName: 'High Back',
      name: 'Supreme Executive Chair - High Back',
      description: 'High back variant for maximum support and presence.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749803024/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'supreme-mb',
      variantName: 'Mid Back',
      name: 'Supreme Executive Chair - Mid Back',
      description: 'Mid back variant for agile comfort and style.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749803013/steelmade/chairs/executive-series/supreme/ic-56-mb.jpg.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
