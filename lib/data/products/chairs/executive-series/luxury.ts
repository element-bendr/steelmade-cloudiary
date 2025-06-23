import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

/**
 * Luxury Executive Chair data (poetic, modular, production-ready)
 */
const luxuryExecutiveChair = createDirectorChair({
  id: 'luxury',
  name: 'Luxury Executive Chair',
  description: 'The Luxury Executive Chair is the epitome of opulence and ergonomic mastery, crafted for those who demand the finest in comfort and design.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-40-hb',
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-39-mb',
    },
  ],
  features: [
    'Sumptuous cushioning with premium upholstery',
    'Polished accents and refined silhouette',
    'Ergonomic support for executive comfort',
    'Available in high-back and mid-back variants',
    'A chair that defines luxury in the modern office',
  ],
  defaultVariant: 'high-back',
});

const variants = Array.isArray(luxuryExecutiveChair.variants) ? luxuryExecutiveChair.variants : [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749801322/steelmade/chairs/executive-series/luxury/ic-40-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749801322/steelmade/chairs/executive-series/luxury/ic-40-hb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749801328/steelmade/chairs/executive-series/luxury/ic-39-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749801328/steelmade/chairs/executive-series/luxury/ic-39-mb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  }
});
(luxuryExecutiveChair as any).images = variants.map(v => v.imageUrl);
(luxuryExecutiveChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerExecutiveChair(luxuryExecutiveChair);

export default luxuryExecutiveChair;
