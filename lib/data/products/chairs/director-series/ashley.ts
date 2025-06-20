import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Ashley Director Chair data
 */
const ashleyDirectorChair = createDirectorChair({
  id: 'ashley',
  name: 'Ashley Director Chair',
  description: 'The Ashley Director Chair combines premium comfort with elegant design, perfect for professional settings.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-123-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-124-mb'
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
  defaultVariant: 'high-back'
});

// Set correct imageUrl for each variant using the provided working URLs
ashleyDirectorChair.variants.forEach(variant => {
  if (variant.imageCode === 'ic-123-hb' || variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg';
  } else if (variant.imageCode === 'ic-124-mb' || variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg';
  }
});

// Add top-level images array and images array for each variant
ashleyDirectorChair.images = ashleyDirectorChair.variants.map(v => v.imageUrl);
ashleyDirectorChair.variants.forEach(variant => {
  if (variant.imageUrl) {
    variant.images = [variant.imageUrl];
  }
});

// Set top-level imageUrl for Ashley chair for ChairCard compatibility.
ashleyDirectorChair.imageUrl = ashleyDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || ashleyDirectorChair.variants[0]?.imageUrl;

// Register this chair with the director series
registerDirectorChair(ashleyDirectorChair);

export default ashleyDirectorChair;