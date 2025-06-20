import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Kotak Director Chair data (poetic, modular, production-ready)
 */
const kotakDirectorChair = createDirectorChair({
  id: 'kotak',
  name: 'Kotak Director Chair',
  description: 'The Kotak Director Chair is a testament to geometric grace and enduring comfort, designed for those who shape vision into reality.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-13-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-12-mb'
    }
  ],
  features: [
    'Architectural aluminum frame with bold lines',
    'Weather-resistant, plush upholstery',
    'Ergonomic support for long hours of creativity',
    'Foldable for seamless mobility',
    'Available in high-back and mid-back variants',
    'A chair for innovators and dreamers'
  ],
  defaultVariant: 'high-back'
});

kotakDirectorChair.variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460525/steelmade/chairs/director-series/kotak/ic-13-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749460525/steelmade/chairs/director-series/kotak/ic-13-hb.jpg'];
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460537/steelmade/chairs/director-series/kotak/ic-12-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749460537/steelmade/chairs/director-series/kotak/ic-12-mb.jpg'];
  }
});

(kotakDirectorChair as any).images = kotakDirectorChair.variants.map(v => v.imageUrl);
(kotakDirectorChair as any).imageUrl = kotakDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || kotakDirectorChair.variants[0]?.imageUrl;

registerDirectorChair(kotakDirectorChair);

export default kotakDirectorChair;
