import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const saharaExecutiveChair = createDirectorChair({
  id: 'sahara',
  name: 'Sahara Executive Chair',
  description: 'The Sahara Executive Chair offers a blend of desert-inspired elegance and ergonomic comfort, available in high-back and mid-back variants.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-46-hb',
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-45-mb',
    }
  ],
  features: [
    'Desert-inspired design',
    'Premium upholstery',
    'Ergonomic support',
    'Available in high-back and mid-back variants',
  ],
  defaultVariant: 'high-back',
});

const variants = saharaExecutiveChair.variants ?? [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749799357/steelmade/chairs/executive-series/sahara/ic-46-hb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749799359/steelmade/chairs/executive-series/sahara/ic-45-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749799359/steelmade/chairs/executive-series/sahara/ic-45-mb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  }
});
(saharaExecutiveChair as any).images = variants.map(v => v.imageUrl);
(saharaExecutiveChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerExecutiveChair(saharaExecutiveChair);

export default saharaExecutiveChair;
