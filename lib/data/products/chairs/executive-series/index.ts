import { ProductSeries } from '../../../product-types';
import { skodaExecutiveChair } from './skoda/index';
import { commanderExecutiveChair } from './commander/index';
import { koreanExecutiveChair } from './korean/index';
import { lxExecutiveChair } from './lx/index';
import { obamaExecutiveChair } from './obama/index';
import { benzExecutiveChair } from './benz/index';
import { dusterExecutiveChair } from './duster/index';
import { perkshynlExecutiveChair } from './perkshynl/index';
import { perkExecutiveChair } from './perk/index';
import { default as luxuryExecutiveChair } from './luxury/index';
import { amigoExecutiveChair } from './amigo/index';
import amazon from './amazon/index';
import { saharaExecutiveChair } from './sahara/index';
import siemensExecutiveChair from './siemens';
import syndicateExecutiveChair from './syndicate';
import vernaExecutiveChair from './verna';
import { supremeExecutiveChair } from './supreme/index';
import { miniMarksonExecutiveChair } from './mini-markson/index';
import { venusRevUdExecutiveChair } from './venus-rev-ud/index';
import { iranaExecutiveChair } from './irana/index';
import { premierExecutiveChair } from './premier/index';
import { nanoExecutiveChair } from './nano/index';
import { miniGingerDolphinExecutiveChair } from './mini-ginger-dolphin/index';
import { phantomExecutiveChair } from './phantom/index';
import { wilsonExecutiveChair } from './wilson/index';
import { maksonExecutiveChair } from './makson/index';

export const executiveSeries: ProductSeries = {
  id: 'executive-series',
  title: 'Executive Series',
  description: 'Premium chairs designed for executives and high-end office environments.',
  seoDescription:
    'The Executive Series embodies the art of leadership—each chair a throne of innovation, comfort, and prestige. Elevate your workspace with designs that inspire vision and command respect.',
  coverImage: {
    url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
    alt: 'A poetic view of the Executive Series chair, radiating authority and comfort.',
    width: 1200,
    height: 800
  },
  products: Object.fromEntries(
    [
      commanderExecutiveChair,
      koreanExecutiveChair,
      lxExecutiveChair,
      obamaExecutiveChair,
      benzExecutiveChair,
      dusterExecutiveChair,
      perkshynlExecutiveChair,
      perkExecutiveChair,
      luxuryExecutiveChair,
      amigoExecutiveChair,
      amazon,
      saharaExecutiveChair,
      siemensExecutiveChair,
      syndicateExecutiveChair,
      vernaExecutiveChair,
      supremeExecutiveChair,
      miniMarksonExecutiveChair,
      venusRevUdExecutiveChair,
      iranaExecutiveChair,
      premierExecutiveChair,
      nanoExecutiveChair,
      miniGingerDolphinExecutiveChair,
      phantomExecutiveChair,
      wilsonExecutiveChair,
      maksonExecutiveChair,
      skodaExecutiveChair
    ]
      .filter(Boolean)
      .map((p) => [p.id, p])
  ),
};
