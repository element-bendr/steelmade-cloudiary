import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

/**
 * Amazon Executive Chair data (poetic, modular, production-ready)
 */
const amazonExecutiveChair = createDirectorChair({
  id: 'amazon',
  name: 'Amazon Executive Chair',
  description: 'The Amazon Executive Chair is a river of comfort and authority, crafted for those who lead with depth and vision.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-53-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-54-mb'
    }
  ],
  features: [
    'Commanding aluminum frame with flowing lines',
    'Weather-resistant, plush upholstery',
    'Ergonomic design for executive comfort',
    'Foldable for seamless movement',
    'Available in high-back and mid-back variants',
    'A chair for leaders of vision and resolve'
  ],
  defaultVariant: 'high-back'
});

const variants = amazonExecutiveChair.variants ?? [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802514/steelmade/chairs/executive-series/amazon/ic-53-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749802514/steelmade/chairs/executive-series/amazon/ic-53-hb.jpg'];
    // Add custom imageClass for better containment
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802784/steelmade/chairs/executive-series/amazon/ic-54-mb.png';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749802784/steelmade/chairs/executive-series/amazon/ic-54-mb.png'];
  }
});
(amazonExecutiveChair as any).images = variants.map(v => v.imageUrl);
(amazonExecutiveChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerExecutiveChair(amazonExecutiveChair);

export default amazonExecutiveChair;
