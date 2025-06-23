import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Boston Director Chair data with correct image URLs
 */
const bostonDirectorChair = createDirectorChair({
  id: 'boston',
  name: 'Boston Director Chair',
  description: 'The Boston Director Chair combines elegant design with premium comfort, perfect for professional settings.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-06-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-07-mb'
    }
  ],
  features: [
    'Premium quality aluminum frame',
    'Ergonomic design for extended comfort',
    'Weather-resistant materials',
    'Foldable for easy storage and transport',
    'Available in high-back and mid-back variants',
    'Durable construction for long-lasting use'
  ],
  defaultVariant: 'high-back'
});

// Override the default image URLs with the correct ones
if (bostonDirectorChair.variants) {
  bostonDirectorChair.variants.forEach(variant => {
    if (variant.id === 'high-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/boston/ic-06-hb.jpg';
      variant.images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/boston/ic-06-hb.jpg'];
    } else if (variant.id === 'mid-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/boston/ic-07-mb.jpg';
      variant.images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/boston/ic-07-mb.jpg'];
    }
  });
}

// Update the primary image URL to match the default variant
if (bostonDirectorChair.variants && bostonDirectorChair.variants.length > 0) {
  bostonDirectorChair.imageUrl = bostonDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || bostonDirectorChair.variants[0]?.imageUrl;
}

// Register this chair with the director series
registerDirectorChair(bostonDirectorChair);

export default bostonDirectorChair;