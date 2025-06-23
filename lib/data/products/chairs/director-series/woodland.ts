import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Woodland Director Chair data with correct image URLs
 */
const woodlandDirectorChair = createDirectorChair({
  id: 'woodland',
  name: 'Woodland Director Chair',
  description: 'The Woodland Director Chair combines rustic charm with premium comfort, perfect for outdoor productions.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-338-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-339-mb'
    }
  ],
  features: [
    'Nature-inspired design elements',
    'Premium weather-resistant materials',
    'Ergonomic design for extended comfort',
    'Foldable for easy transport and storage',
    'Unique appearance for outdoor settings',
    'Available in high-back and mid-back variants'
  ],
  defaultVariant: 'high-back'
});

// Override the default image URLs with the correct ones
if (woodlandDirectorChair.variants) {
  woodlandDirectorChair.variants.forEach(variant => {
    if (variant.id === 'high-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg';
      variant.images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg'];
    } else if (variant.id === 'mid-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-339-mb.jpg';
      variant.images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-339-mb.jpg'];
    }
  });
}

// Update the primary image URL to match the default variant
if (woodlandDirectorChair.variants && woodlandDirectorChair.variants.length > 0) {
  woodlandDirectorChair.imageUrl = woodlandDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || woodlandDirectorChair.variants[0]?.imageUrl;
}

// Add top-level images array and images array for each variant
if (woodlandDirectorChair.variants) {
  woodlandDirectorChair.images = woodlandDirectorChair.variants.map(v => v.imageUrl ?? '').filter(Boolean);
  woodlandDirectorChair.variants.forEach(variant => {
    if (variant.imageUrl) {
      variant.images = [variant.imageUrl];
    }
  });
}

// Register this chair with the director series
registerDirectorChair(woodlandDirectorChair);

export default woodlandDirectorChair;