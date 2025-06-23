import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const supremeExecutiveChair = createDirectorChair({
  id: 'supreme',
  name: 'Supreme Executive Chair',
  description: 'The Supreme Executive Chair delivers top-tier comfort and authority, available in both high-back and mid-back variants for the ultimate executive experience.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-55-hb',
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-56-mb',
    }
  ],
  features: [
    'Top-tier executive design',
    'Plush, ergonomic cushioning',
    'Available in high-back and mid-back variants',
    'A chair for those who demand the best',
  ],
  defaultVariant: 'high-back',
});

if (Array.isArray(supremeExecutiveChair.variants)) {
  supremeExecutiveChair.variants.forEach(variant => {
    if (variant.id === 'high-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749803024/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg.jpg';
      (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749803024/steelmade/chairs/executive-series/supreme/ic-55-hb.jpg.jpg'];
      (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
    } else if (variant.id === 'mid-back') {
      variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749803013/steelmade/chairs/executive-series/supreme/ic-56-mb.jpg.jpg';
      (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749803013/steelmade/chairs/executive-series/supreme/ic-56-mb.jpg.jpg'];
      (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
    }
  });
}
(supremeExecutiveChair as any).images = Array.isArray(supremeExecutiveChair.variants) ? supremeExecutiveChair.variants.map(v => v.imageUrl) : [];
(supremeExecutiveChair as any).imageUrl = Array.isArray(supremeExecutiveChair.variants) ? (supremeExecutiveChair.variants.find(v => v.id === 'high-back')?.imageUrl || supremeExecutiveChair.variants[0]?.imageUrl) : undefined;

registerExecutiveChair(supremeExecutiveChair);

export default supremeExecutiveChair;
