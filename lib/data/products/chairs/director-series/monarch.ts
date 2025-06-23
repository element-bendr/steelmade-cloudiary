import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Monarch Director Chair data (poetic, modular, production-ready)
 */
const monarchDirectorChair = createDirectorChair({
  id: 'monarch',
  name: 'Monarch Director Chair',
  description: 'The Monarch Director Chair radiates regal presence and comfort, designed for those who lead with vision and grace.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-08-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-09-mb'
    }
  ],
  features: [
    'Royal aluminum frame with elegant lines',
    'Weather-resistant, plush upholstery',
    'Ergonomic support for enduring leadership',
    'Foldable for effortless movement',
    'Available in high-back and mid-back variants',
    'A chair for those who inspire'
  ],
  defaultVariant: 'high-back'
});

const variants = monarchDirectorChair.variants ?? [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459625/steelmade/chairs/director-series/monarch/ic-08-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749459625/steelmade/chairs/director-series/monarch/ic-08-hb.jpg'];
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459633/steelmade/chairs/director-series/monarch/ic-09-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749459633/steelmade/chairs/director-series/monarch/ic-09-mb.jpg'];
  }
});
(monarchDirectorChair as any).images = variants.map(v => v.imageUrl);
(monarchDirectorChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerDirectorChair(monarchDirectorChair);

export default monarchDirectorChair;
