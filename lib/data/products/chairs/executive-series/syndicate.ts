import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const syndicateExecutiveChair = createDirectorChair({
  id: 'syndicate',
  name: 'Syndicate Executive Chair',
  description: 'The Syndicate Executive Chair is designed for boardrooms and high-level collaboration, with high-back and mid-back options.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-59-hb',
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-60-mb',
    }
  ],
  features: [
    'Boardroom-ready design',
    'Collaborative comfort',
    'Ergonomic support',
    'Available in high-back and mid-back variants',
  ],
  defaultVariant: 'high-back',
});

const variants = syndicateExecutiveChair.variants ?? [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749802268/steelmade/chairs/executive-series/syndicate/ic-59-hb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802131/steelmade/chairs/executive-series/syndicate/ic-60-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749802131/steelmade/chairs/executive-series/syndicate/ic-60-mb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  }
});
(syndicateExecutiveChair as any).images = variants.map(v => v.imageUrl);
(syndicateExecutiveChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerExecutiveChair(syndicateExecutiveChair);

export default syndicateExecutiveChair;
