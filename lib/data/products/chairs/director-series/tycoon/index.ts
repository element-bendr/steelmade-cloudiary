import { ExtendedProductData } from '@/lib/templates/product-template';

const tycoonDirectorChair: ExtendedProductData = {
  id: 'tycoon',
  name: 'Tycoon Director Chair',
  description: 'The Tycoon Director Chair offers luxurious comfort with premium materials and sophisticated design.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-127-hb',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg',
      images: ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg']
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-128-mb',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458141/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg',
      images: ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458141/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg']
    }
  ],
  features: [
    'Luxury aluminum frame construction',
    'Premium fabric for superior comfort',
    'Weather and UV resistant materials',
    'Foldable design for easy transportation',
    'Professional appearance for high-end productions',
    'Available in high-back and mid-back variants'
  ],
  defaultVariant: 'high-back',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg',
      alt: 'Tycoon Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458141/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg',
      alt: 'Tycoon Director Chair Mid Back',
    }
  ]
};

export default tycoonDirectorChair;
