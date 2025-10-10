import { ExtendedProductData } from '@/lib/data/product-types';

const tridentDirectorChair: ExtendedProductData = {
  id: 'trident',
  name: 'Trident Director Chair',
  description: 'The Trident Director Chair is a symbol of strength and clarity, crafted for those who command with purpose and vision.',
  category: 'chairs',
  seriesId: 'director-series',
  features: [
    'Robust aluminum frame with iconic design',
    'Weather-resistant, supportive upholstery',
    'Ergonomic comfort for decisive leadership',
    'Foldable for agile movement',
    'Available in high-back and mid-back variants',
    'A chair for those who shape destiny'
  ],
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'Trident Director Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748806921/steelmade/chairs/director-series/trident/ic-249-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Trident Director Chair - Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748809633/steelmade/chairs/director-series/trident/ic-250-mb.jpg'
    }
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748806921/steelmade/chairs/director-series/trident/ic-249-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748806921/steelmade/chairs/director-series/trident/ic-249-hb.jpg',
      alt: 'Trident Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748809633/steelmade/chairs/director-series/trident/ic-250-mb.jpg',
      alt: 'Trident Director Chair Mid Back',
    }
  ]
};

export default tridentDirectorChair;
