import { ExtendedProductData } from '@/lib/templates/product-template';

const ashleyDirectorChair: ExtendedProductData = {
  id: 'ashley',
  name: 'Ashley Director Chair',
  description: 'The Ashley Director Chair combines premium comfort with elegant design, perfect for professional settings.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-123-hb',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
      images: ['https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg']
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-124-mb',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg',
      images: ['https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg']
    }
  ],
  features: [
    'Premium aluminum frame',
    'Ergonomic design for extended comfort',
    'Weather-resistant materials',
    'Foldable for easy storage and transport',
    'Available in high-back and mid-back variants',
    'Durable construction for long-lasting use'
  ],
  defaultVariant: 'high-back',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
      alt: 'Ashley Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg',
      alt: 'Ashley Director Chair Mid Back',
    }
  ]
};

export default ashleyDirectorChair;
