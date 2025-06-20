import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * Milano Director Chair data (poetic, modular, production-ready)
 */
const milanoDirectorChair = createDirectorChair({
  id: 'milano',
  name: 'Milano Director Chair',
  description: 'The Milano Director Chair is a symphony of Italian elegance and enduring comfort, crafted for those who direct with style.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-251-hb'
    }
  ],
  features: [
    'Refined aluminum frame with Italian flair',
    'Weather-resistant, luxurious upholstery',
    'Ergonomic design for creative endurance',
    'Foldable for effortless movement',
    'Available in high-back variant',
    'A chair for maestros and visionaries'
  ],
  defaultVariant: 'high-back'
});

milanoDirectorChair.variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748773743/steelmade/chairs/director-series/milano/ic-251-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1748773743/steelmade/chairs/director-series/milano/ic-251-hb.jpg'];
  }
});

(milanoDirectorChair as any).images = milanoDirectorChair.variants.map(v => v.imageUrl);
(milanoDirectorChair as any).imageUrl = milanoDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || milanoDirectorChair.variants[0]?.imageUrl;

registerDirectorChair(milanoDirectorChair);

export default milanoDirectorChair;
