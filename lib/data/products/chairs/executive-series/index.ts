import { ProductSeries } from '../../../product-types';
import { toExtendedProductData, isExtendedProductData } from './toExtendedProductData';
import { skodaExecutiveChair } from './skoda';
import { commanderExecutiveChair } from './commander';
import { koreanExecutiveChair } from './korean';
import { lxExecutiveChair } from './lx';
import { obamaExecutiveChair } from './obama';
import { benzExecutiveChair } from './benz';
import { dusterExecutiveChair } from './duster';
import { perkshynlExecutiveChair } from './perkshynl';
import { perkExecutiveChair } from './perk';
import luxuryExecutiveChair from './luxury';
import amigoExecutiveChair from './amigo';
import amazonExecutiveChair from './amazon';
import saharaExecutiveChair from './sahara';
import siemensExecutiveChair from './siemens';
import syndicateExecutiveChair from './syndicate';
import vernaExecutiveChair from './verna';
import supremeExecutiveChair from './supreme';
import miniMarksonExecutiveChair from './mini-markson';
import venusRevUdExecutiveChair from './venus-rev-ud';
import iranaExecutiveChair from './irana';
import { jetLazerComputerExecutiveChair } from './jet-lazer-computer';
import { premierExecutiveChair } from './premier';
import { nanoExecutiveChair } from './nano';
import { miniGingerDolphinExecutiveChair } from './mini-ginger-dolphin';
import { phantomExecutiveChair } from './phantom';
import { wilsonExecutiveChair } from './wilson';
import { maksonExecutiveChair } from './makson';

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
      amazonExecutiveChair,
      saharaExecutiveChair,
      siemensExecutiveChair,
      syndicateExecutiveChair,
      vernaExecutiveChair,
      supremeExecutiveChair,
      miniMarksonExecutiveChair,
      venusRevUdExecutiveChair,
      iranaExecutiveChair,
      skodaExecutiveChair,
      jetLazerComputerExecutiveChair,
      premierExecutiveChair,
      nanoExecutiveChair,
      miniGingerDolphinExecutiveChair,
      phantomExecutiveChair,
      wilsonExecutiveChair,
      maksonExecutiveChair
    ].map(product => {
      const prod = isExtendedProductData(product) ? product : toExtendedProductData(product);
      return [prod.id, prod];
    })
  ),
};
