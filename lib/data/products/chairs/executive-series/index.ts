import { ProductSeries } from '../../product-types';
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
import { safariExecutiveChair } from './safari';

export const executiveSeries: ProductSeries = {
  id: 'executive-series',
  description: 'Premium chairs designed for executives and high-end office environments.',
  products: {
    [commanderExecutiveChair.id]: commanderExecutiveChair,
    [koreanExecutiveChair.id]: koreanExecutiveChair,
    [lxExecutiveChair.id]: lxExecutiveChair,
    [obamaExecutiveChair.id]: obamaExecutiveChair,
    [benzExecutiveChair.id]: benzExecutiveChair,
    [dusterExecutiveChair.id]: dusterExecutiveChair,
    [perkshynlExecutiveChair.id]: perkshynlExecutiveChair,
    [perkExecutiveChair.id]: perkExecutiveChair,
    [luxuryExecutiveChair.id]: luxuryExecutiveChair,
    [amigoExecutiveChair.id]: amigoExecutiveChair,
    [amazonExecutiveChair.id]: amazonExecutiveChair,
    [saharaExecutiveChair.id]: saharaExecutiveChair,
    [siemensExecutiveChair.id]: siemensExecutiveChair,
    [syndicateExecutiveChair.id]: syndicateExecutiveChair,
    [vernaExecutiveChair.id]: vernaExecutiveChair,
    [supremeExecutiveChair.id]: supremeExecutiveChair,
    [miniMarksonExecutiveChair.id]: miniMarksonExecutiveChair,
    [venusRevUdExecutiveChair.id]: venusRevUdExecutiveChair,
    [iranaExecutiveChair.id]: iranaExecutiveChair,
    [skodaExecutiveChair.id]: skodaExecutiveChair,
    [jetLazerComputerExecutiveChair.id]: jetLazerComputerExecutiveChair,
    [premierExecutiveChair.id]: premierExecutiveChair,
    [nanoExecutiveChair.id]: nanoExecutiveChair,
    [miniGingerDolphinExecutiveChair.id]: miniGingerDolphinExecutiveChair,
    [phantomExecutiveChair.id]: phantomExecutiveChair,
    [wilsonExecutiveChair.id]: wilsonExecutiveChair,
    [maksonExecutiveChair.id]: maksonExecutiveChair,
    [safariExecutiveChair.id]: safariExecutiveChair,
  }
};
