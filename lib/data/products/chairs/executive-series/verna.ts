import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const vernaExecutiveChair = createDirectorChair({
  id: 'verna',
  name: 'Verna Executive Chair',
  description: 'The Verna Executive Chair brings Italian-inspired style and comfort to the executive office, with both high-back and mid-back options.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-44-hb',
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-43-mb',
    }
  ],
  features: [
    'Italian-inspired design',
    'Premium comfort',
    'Ergonomic support',
    'Available in high-back and mid-back variants',
  ],
  defaultVariant: 'high-back',
});

const variants = vernaExecutiveChair.variants ?? [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797678/steelmade/chairs/executive-series/verna/ic-43-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749797678/steelmade/chairs/executive-series/verna/ic-43-mb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  }
});
(vernaExecutiveChair as any).images = variants.map(v => v.imageUrl);
(vernaExecutiveChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerExecutiveChair(vernaExecutiveChair);

export default vernaExecutiveChair;
