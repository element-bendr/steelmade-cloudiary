import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './registerDirectorChair';

/**
 * BigBoss Gold Director Chair data
 */
const bigbossGoldDirectorChair = createDirectorChair({
  id: 'bigboss-gold',
  name: 'BigBoss Gold Director Chair',
  description: 'The BigBoss Gold Director Chair delivers exceptional luxury with gold accents and premium materials.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-129-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-130-mb'
    }
  ],
  features: [
    'Gold-accented aluminum frame',
    'Premium fabric with elegant detailing',
    'Weather-resistant for outdoor use',
    'Foldable design for convenient storage',
    'Distinctive luxury appearance',
    'Available in high-back and mid-back options'
  ],
  defaultVariant: 'high-back'
});

// Set correct imageUrl for each variant using the provided working URLs
bigbossGoldDirectorChair.variants.forEach(variant => {
  if (variant.imageCode === 'ic-129-hb' || variant.id === 'high-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459939/steelmade/chairs/director-series/bigbossgold/ic-255-hb.jpg';
  } else if (variant.imageCode === 'ic-130-mb' || variant.id === 'mid-back') {
    variant.imageUrl = 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459908/steelmade/chairs/director-series/bigbossgold/ic-256-mb.jpg';
  }
});

// Add top-level images array and images array for each variant
bigbossGoldDirectorChair.images = bigbossGoldDirectorChair.variants.map(v => v.imageUrl);
bigbossGoldDirectorChair.variants.forEach(variant => {
  if (variant.imageUrl) {
    variant.images = [variant.imageUrl];
  }
});

// Set top-level imageUrl for BigBoss Gold chair for ChairCard compatibility.
bigbossGoldDirectorChair.imageUrl = bigbossGoldDirectorChair.variants.find(v => v.id === 'high-back')?.imageUrl || bigbossGoldDirectorChair.variants[0]?.imageUrl;

// Register this chair with the director series
registerDirectorChair(bigbossGoldDirectorChair);

export default bigbossGoldDirectorChair;