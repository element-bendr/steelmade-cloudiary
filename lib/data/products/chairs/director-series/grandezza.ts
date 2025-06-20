import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Grandezza Director Chair data (poetic, modular, production-ready)
 */
const grandezzaDirectorChair = createDirectorChair({
  id: 'grandezza',
  name: 'Grandezza Director Chair',
  description: 'The Grandezza Director Chair embodies grandeur and comfort, crafted for those who command presence and poise.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-04-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-05-mb'
    }
  ],
  features: [
    'Majestic aluminum frame with a poetic silhouette',
    'Sumptuous, weather-resistant upholstery',
    'Ergonomic design for enduring comfort',
    'Foldable for effortless transport',
    'Available in high-back and mid-back variants',
    'A chair for visionaries and leaders'
  ],
  defaultVariant: 'high-back'
});

grandezzaDirectorChair.variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458322/steelmade/chairs/director-series/grandezza/ic-04-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458322/steelmade/chairs/director-series/grandezza/ic-04-hb.jpg'];
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458326/steelmade/chairs/director-series/grandezza/ic-05-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749458326/steelmade/chairs/director-series/grandezza/ic-05-mb.jpg'];
  }
});

(grandezzaDirectorChair as any).images = grandezzaDirectorChair.variants.map(v => v.imageUrl);
(grandezzaDirectorChair as any).imageUrl = grandezzaDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || grandezzaDirectorChair.variants[0]?.imageUrl;

registerDirectorChair(grandezzaDirectorChair);

export default grandezzaDirectorChair;
