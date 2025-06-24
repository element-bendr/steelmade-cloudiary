import { ExtendedProductData } from '@/lib/data/product-types';

export const benzExecutiveChair: ExtendedProductData = {
  id: 'benz',
  name: 'Benz Executive Chair',
  description: 'The Benz Executive Chair offers a sleek, automotive-inspired design with plush comfort and a commanding presence for any executive office.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749619914/steelmade/chairs/executive-series/benz/ic-34.jpg',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749619914/steelmade/chairs/executive-series/benz/ic-34.jpg', alt: 'Benz Executive Chair', width: 800, height: 600 }
  ],
  features: [
    'Automotive-inspired silhouette',
    'Premium upholstery and cushioning',
    'Ergonomic support for long hours',
    'A chair for those who value luxury and performance'
  ],
  specifications: {},
  variants: [
    {
      variantId: 'benz-main',
      variantName: 'Standard',
      name: 'Benz Executive Chair',
      description: 'Signature Benz design for executive comfort.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749619914/steelmade/chairs/executive-series/benz/ic-34.jpg',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
