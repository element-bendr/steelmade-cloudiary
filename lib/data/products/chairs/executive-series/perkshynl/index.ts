import { ExtendedProductData } from '@/lib/data/product-types';

export const perkshynlExecutiveChair: ExtendedProductData = {
  id: 'perkshynl',
  name: 'Perkshynl Executive Chair',
  description: 'The Perkshynl Executive Chair combines classic comfort with a contemporary edge, perfect for modern offices.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749461921/steelmade/chairs/executive-series/perkshynl/ic-32.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749461921/steelmade/chairs/executive-series/perkshynl/ic-32.jpg', alt: 'Perkshynl Executive Chair', width: 800, height: 600 }
  ],
  features: [
    'Classic comfort with modern lines',
    'Supportive cushioning',
    'A chair for contemporary professionals'
  ],
  specifications: {},
  variants: [
    {
      variantId: 'perkshynl-main',
      variantName: 'Standard',
      name: 'Perkshynl Executive Chair',
      description: 'Signature Perkshynl comfort and style.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749461921/steelmade/chairs/executive-series/perkshynl/ic-32.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
