import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const miniMarksonExecutiveChair = createDirectorChair({
  id: 'mini-markson',
  name: 'Mini Markson Executive Chair',
  description: 'The Mini Markson Executive Chair offers refined comfort in a compact form, with distinct variants for every executive need.',
  variants: [
    {
      id: 'rev',
      name: 'Rev',
      imageCode: 'ic-67-rev',
    },
    {
      id: 'visitor',
      name: 'Visitor',
      imageCode: 'ic-68-visitor',
    }
  ],
  features: [
    'Compact executive design',
    'Ergonomic support for long hours',
    'Premium materials and finish',
    'Distinct variants for revolving and visitor needs',
  ],
  defaultVariant: 'rev',
});

miniMarksonExecutiveChair.variants.forEach(variant => {
  if (variant.id === 'rev') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-67-rev.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-67-rev.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  } else if (variant.id === 'visitor') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-68-visitor.jpg';
    (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-68-visitor.jpg'];
    (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
  }
});

(miniMarksonExecutiveChair as any).images = miniMarksonExecutiveChair.variants.map(v => v.imageUrl);
(miniMarksonExecutiveChair as any).imageUrl = miniMarksonExecutiveChair.variants.find(v => v.id === 'rev')?.imageUrl || miniMarksonExecutiveChair.variants[0]?.imageUrl;

registerExecutiveChair(miniMarksonExecutiveChair);

export default miniMarksonExecutiveChair;
