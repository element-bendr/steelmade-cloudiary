import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Parker Director Chair data (poetic, modular, production-ready)
 */
const parkerDirectorChair = createDirectorChair({
  id: 'parker',
  name: 'Parker Director Chair',
  description: 'The Parker Director Chair is a blend of modern minimalism and enduring comfort, crafted for those who orchestrate with clarity and poise.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-315-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-316-mb'
    }
  ],
  features: [
    'Minimalist aluminum frame with clean lines',
    'Weather-resistant, supportive upholstery',
    'Ergonomic design for creative focus',
    'Foldable for seamless movement',
    'Available in high-back and mid-back variants',
    'A chair for conductors of vision'
  ],
  defaultVariant: 'high-back'
});

const variants = parkerDirectorChair.variants ?? [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459331/steelmade/chairs/director-series/parker/ic-315-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749459331/steelmade/chairs/director-series/parker/ic-315-hb.jpg'];
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459324/steelmade/chairs/director-series/parker/ic-316-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749459324/steelmade/chairs/director-series/parker/ic-316-mb.jpg'];
  }
});
(parkerDirectorChair as any).images = variants.map(v => v.imageUrl);
(parkerDirectorChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerDirectorChair(parkerDirectorChair);

export default parkerDirectorChair;
