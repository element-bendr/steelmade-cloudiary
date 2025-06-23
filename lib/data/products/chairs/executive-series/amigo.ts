import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

/**
 * Amigo Executive Chair data (poetic, modular, production-ready)
 */
const amigoExecutiveChair = createDirectorChair({
  id: 'amigo',
  name: 'Amigo Executive Chair',
  description: 'The Amigo Executive Chair is a companion in comfort and style, designed for those who value both support and elegance in their workspace.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-331-hb',
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-332-mb',
    },
  ],
  features: [
    'Sculpted ergonomic back for all-day support',
    'Premium upholstery with a soft, inviting touch',
    'Sleek, modern armrests',
    'Available in high-back and mid-back variants',
    'A chair that brings comfort and camaraderie to the executive suite',
  ],
  defaultVariant: 'high-back',
});

const variants = Array.isArray(amigoExecutiveChair.variants) ? amigoExecutiveChair.variants : [];
variants.forEach(variant => {
  if (variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805780/steelmade/chairs/executive-series/amigo/ic-332-mb.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749805780/steelmade/chairs/executive-series/amigo/ic-332-mb.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  }
});
(amigoExecutiveChair as any).images = variants.map(v => v.imageUrl);
(amigoExecutiveChair as any).imageUrl = variants.find(v => v.id === 'high-back')?.imageUrl || variants[0]?.imageUrl;

registerExecutiveChair(amigoExecutiveChair);

export default amigoExecutiveChair;
