import { ExtendedProductData } from '@/lib/data/product-types';

export const koreanExecutiveChair: ExtendedProductData = {
  id: 'korean-chair',
  name: 'Korean Executive Chair',
  description: 'The Korean Executive Chair blends modern minimalism with ergonomic mastery, offering a tranquil yet powerful presence in any executive office.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799552/steelmade/chairs/executive-series/korean/ic-47-hb.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799552/steelmade/chairs/executive-series/korean/ic-47-hb.jpg', alt: 'Korean Executive Chair - High Back', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799549/steelmade/chairs/executive-series/korean/ic-48-mb.jpg', alt: 'Korean Executive Chair - Mid Back', width: 800, height: 600 }
  ],
  features: [
    'Minimalist silhouette with subtle curves',
    'Breathable, premium upholstery',
    'Ergonomic lumbar support',
    'Available in high-back and mid-back variants',
    'A chair for calm, focused leadership'
  ],
  specifications: {},
  variants: [
    {
      variantId: 'korean-hb',
      variantName: 'High Back',
      name: 'Korean Executive Chair - High Back',
      description: 'High back variant for serene support and presence.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799552/steelmade/chairs/executive-series/korean/ic-47-hb.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'korean-mb',
      variantName: 'Mid Back',
      name: 'Korean Executive Chair - Mid Back',
      description: 'Mid back variant for agile comfort and style.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799549/steelmade/chairs/executive-series/korean/ic-48-mb.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
