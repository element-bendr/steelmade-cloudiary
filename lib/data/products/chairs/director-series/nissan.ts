import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Nissan Director Chair data (poetic, modular, production-ready)
 */
const nissanDirectorChair = createDirectorChair({
  id: 'nissan',
  name: 'Nissan Director Chair',
  description: 'The Nissan Director Chair fuses modern dynamism with comfort, crafted for those who drive innovation and lead with clarity.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-253-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-252-mb'
    }
  ],
  features: [
    'Contemporary aluminum frame with bold accents',
    'Weather-resistant, supportive upholstery',
    'Ergonomic design for creative journeys',
    'Foldable for agile movement',
    'Available in high-back and mid-back variants',
    'A chair for pioneers and visionaries'
  ],
  defaultVariant: 'high-back'
});

nissanDirectorChair.variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460685/steelmade/chairs/director-series/nissan/ic-253-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749460685/steelmade/chairs/director-series/nissan/ic-253-hb.jpg'];
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460695/steelmade/chairs/director-series/nissan/ic-252-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749460695/steelmade/chairs/director-series/nissan/ic-252-mb.jpg'];
  }
});

(nissanDirectorChair as any).images = nissanDirectorChair.variants.map(v => v.imageUrl);
(nissanDirectorChair as any).imageUrl = nissanDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || nissanDirectorChair.variants[0]?.imageUrl;

registerDirectorChair(nissanDirectorChair);

export default nissanDirectorChair;
