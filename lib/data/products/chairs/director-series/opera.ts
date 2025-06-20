import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Opera Director Chair data
 */
const operaDirectorChair = createDirectorChair({
  id: 'opera',
  name: 'Opera Director Chair',
  description: 'The Opera Director Chair delivers exceptional comfort with premium materials and elegant design.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-125-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-126-mb'
    }
  ],
  features: [
    'Premium aluminum construction',
    'Superior comfort and support',
    'Weather-resistant fabric',
    'Elegant and professional design',
    'Foldable for convenient storage',
    'Available in high-back and mid-back options'
  ],
  defaultVariant: 'high-back'
});

// Set imageUrl for each variant using imageCode
operaDirectorChair.variants.forEach(variant => {
  if (variant.imageCode === 'ic-125-hb') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454969/steelmade/chairs/director-series/opera/ic-340-hb.jpg';
  } else if (variant.imageCode === 'ic-126-mb') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454891/steelmade/chairs/director-series/opera/ic-341-mb.jpg';
  }
});

// Add top-level images array and images array for each variant
(operaDirectorChair as any).images = operaDirectorChair.variants.map(v => v.imageUrl);
operaDirectorChair.variants.forEach(variant => {
  if (variant.imageUrl) {
    (variant as any).images = [variant.imageUrl];
  }
});

// Set top-level imageUrl for Opera chair for ChairCard compatibility.
operaDirectorChair.imageUrl = operaDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || operaDirectorChair.variants[0]?.imageUrl;

// Register this chair with the director series
registerDirectorChair(operaDirectorChair);

export default operaDirectorChair;