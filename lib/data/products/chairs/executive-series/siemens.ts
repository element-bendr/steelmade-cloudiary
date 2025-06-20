import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const siemensExecutiveChair = createDirectorChair({
  id: 'siemens',
  name: 'Siemens Executive Chair',
  description: 'The Siemens Executive Chair delivers German-inspired precision and comfort, with both high-back and mid-back options.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-41-hb',
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-42-mb',
    }
  ],
  features: [
    'German-inspired design',
    'Precision engineering',
    'Ergonomic comfort',
    'Available in high-back and mid-back variants',
  ],
  defaultVariant: 'high-back',
});

siemensExecutiveChair.variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-42-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-42-mb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  }
});

(siemensExecutiveChair as any).images = siemensExecutiveChair.variants.map(v => v.imageUrl);
(siemensExecutiveChair as any).imageUrl = siemensExecutiveChair.variants.find(v => v.id === 'high-back')?.imageUrl || siemensExecutiveChair.variants[0]?.imageUrl;

registerExecutiveChair(siemensExecutiveChair);

export default siemensExecutiveChair;
