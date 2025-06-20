import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const iranaExecutiveChair = createDirectorChair({
  id: 'irana',
  name: 'Irana Executive Chair',
  description: 'The Irana Executive Chair is a statement of elegance and support, crafted for discerning executives.',
  variants: [
    {
      id: 'irana',
      name: 'Irana',
      imageCode: 'ic-62',
    }
  ],
  features: [
    'Elegant executive design',
    'Supportive ergonomic build',
    'Premium upholstery and finish',
  ],
  defaultVariant: 'irana',
});

iranaExecutiveChair.variants.forEach(variant => {
  variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/irana/ic-62.jpg';
  (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/irana/ic-62.jpg'];
  (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
});

(iranaExecutiveChair as any).images = iranaExecutiveChair.variants.map(v => v.imageUrl);
(iranaExecutiveChair as any).imageUrl = iranaExecutiveChair.variants[0]?.imageUrl;

registerExecutiveChair(iranaExecutiveChair);

export default iranaExecutiveChair;
