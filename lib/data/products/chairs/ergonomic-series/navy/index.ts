import { ExtendedProductData } from '@/lib/data/product-types';

const navyErgonomicChair: ExtendedProductData = {
  id: 'navy-ergonomic-chair',
  name: 'Navy Ergonomic Chair',
  description: 'The Navy Ergonomic Chair series offers modern comfort, elegant design, and versatile color options for any workspace.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-146',
      variantName: 'Navy',
      name: 'Navy Ergonomic Chair',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189739/steelmade/chairs/ergonomic-series/navy/ic-146.png',
    },
    {
      variantId: 'ic-146a-white',
      variantName: 'White',
      name: 'Navy Ergonomic Chair White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189738/steelmade/chairs/ergonomic-series/navy/ic-146a-white.png',
    },
    {
      variantId: 'ic-146b-grey',
      variantName: 'Grey',
      name: 'Navy Ergonomic Chair Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189737/steelmade/chairs/ergonomic-series/navy/ic-146b-grey.png',
    }
  ],
  features: [
    'Modern ergonomic support',
    'Multiple color options',
    'Premium materials for durability',
    'Elegant, versatile design',
    'Perfect for office and home use'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189739/steelmade/chairs/ergonomic-series/navy/ic-146.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189739/steelmade/chairs/ergonomic-series/navy/ic-146.png', alt: 'Navy Ergonomic Chair' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189738/steelmade/chairs/ergonomic-series/navy/ic-146a-white.png', alt: 'Navy Ergonomic Chair White' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189737/steelmade/chairs/ergonomic-series/navy/ic-146b-grey.png', alt: 'Navy Ergonomic Chair Grey' }
  ]
};

export default navyErgonomicChair;
