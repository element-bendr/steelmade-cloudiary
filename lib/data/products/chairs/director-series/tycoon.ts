import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Tycoon Director Chair data (final, declarative, type-safe)
 */
const tycoonDirectorChair = createDirectorChair({
  id: 'tycoon',
  name: 'Tycoon Director Chair',
  description: 'The Tycoon Director Chair offers luxurious comfort with premium materials and sophisticated design.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-127-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-128-mb'
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
  defaultVariant: 'high-back'
});

// Set correct imageUrl for each variant using the provided working URLs
if (tycoonDirectorChair.variants) {
  tycoonDirectorChair.variants.forEach(variant => {
    if (variant.imageCode === 'ic-127-hb' || variant.id === 'high-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg';
      variant.images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg'];
    } else if (variant.imageCode === 'ic-128-mb' || variant.id === 'mid-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458141/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg';
      variant.images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458141/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg'];
    }
  });
}

// @ts-ignore: images is used for UI compatibility
tycoonDirectorChair.images = tycoonDirectorChair.variants.map(v => v.imageUrl);

// Set top-level imageUrl for Tycoon chair for ChairCard compatibility.
if (tycoonDirectorChair.variants && tycoonDirectorChair.variants.length > 0) {
  tycoonDirectorChair.imageUrl = tycoonDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || tycoonDirectorChair.variants[0]?.imageUrl;
}

registerDirectorChair(tycoonDirectorChair);

export default tycoonDirectorChair;