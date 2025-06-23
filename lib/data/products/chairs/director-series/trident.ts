import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Trident Director Chair data (poetic, modular, production-ready)
 */
const tridentDirectorChair = createDirectorChair({
  id: 'trident',
  name: 'Trident Director Chair',
  description: 'The Trident Director Chair is a symbol of strength and clarity, crafted for those who command with purpose and vision.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-249-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-250-mb'
    }
  ],
  features: [
    'Robust aluminum frame with iconic design',
    'Weather-resistant, supportive upholstery',
    'Ergonomic comfort for decisive leadership',
    'Foldable for agile movement',
    'Available in high-back and mid-back variants',
    'A chair for those who shape destiny'
  ],
  defaultVariant: 'high-back'
});

const variants = tridentDirectorChair.variants ?? [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748806921/steelmade/chairs/director-series/trident/ic-249-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1748806921/steelmade/chairs/director-series/trident/ic-249-hb.jpg'];
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748809633/steelmade/chairs/director-series/trident/ic-250-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1748809633/steelmade/chairs/director-series/trident/ic-250-mb.jpg'];
  }
});
(tridentDirectorChair as any).images = variants.map(v => v.imageUrl);
(tridentDirectorChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerDirectorChair(tridentDirectorChair);

export default tridentDirectorChair;
