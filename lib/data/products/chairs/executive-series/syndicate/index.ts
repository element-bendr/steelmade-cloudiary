import { ExtendedProductData } from '@/lib/templates/product-template';

const syndicate: ExtendedProductData = {
  id: 'syndicate',
  name: 'Syndicate Executive Chair',
  description: 'The Syndicate Executive Chair is designed for boardrooms and high-level collaboration, with high-back and mid-back options.',
  category: 'chairs',
  seriesId: 'executive-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg',
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802131/steelmade/chairs/executive-series/syndicate/ic-60-mb.jpg',
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  features: [
    'Boardroom-ready design',
    'Collaborative comfort',
    'Ergonomic support',
    'Available in high-back and mid-back variants',
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg',
      alt: 'Syndicate Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802131/steelmade/chairs/executive-series/syndicate/ic-60-mb.jpg',
      alt: 'Syndicate Executive Chair Mid Back',
    }
  ]
};

export default syndicate;
