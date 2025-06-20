import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerExecutiveChair } from './registerExecutiveChair';

const venusRevUdExecutiveChair = createDirectorChair({
  id: 'venus-rev-ud',
  name: 'Venus Rev UD Executive Chair',
  description: 'The Venus Rev UD Executive Chair blends modern design with ergonomic comfort, perfect for dynamic executive spaces.',
  variants: [
    {
      id: 'rev-ud',
      name: 'Rev UD',
      imageCode: 'ic-304',
    }
  ],
  features: [
    'Modern executive silhouette',
    'Ergonomic support for all-day comfort',
    'Premium materials and finish',
  ],
  defaultVariant: 'rev-ud',
});

venusRevUdExecutiveChair.variants.forEach(variant => {
  variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/Venus-rev-ud/ic-304.jpg';
  (variant as any).images = ['https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/Venus-rev-ud/ic-304.jpg'];
  (variant as any).imageClass = 'object-contain p-8 max-h-[420px]';
});

(venusRevUdExecutiveChair as any).images = venusRevUdExecutiveChair.variants.map(v => v.imageUrl);
(venusRevUdExecutiveChair as any).imageUrl = venusRevUdExecutiveChair.variants[0]?.imageUrl;

registerExecutiveChair(venusRevUdExecutiveChair);

export default venusRevUdExecutiveChair;
