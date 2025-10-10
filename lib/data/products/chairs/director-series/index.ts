import { ProductSeries } from '../../../product-types';
import ashleyDirectorChair from './ashley-director-chair/index';
import operaDirectorChair from './opera-director-chair/index';
import tycoonDirectorChair from './tycoon-director-chair/index';
import woodlandDirectorChair from './woodland-director-chair/index';
import bostonDirectorChair from './boston/index';
import grandezzaDirectorChair from './grandezza/index';
import kotakDirectorChair from './kotak/index';
import milanoDirectorChair from './milano/index';
import monarchDirectorChair from './monarch/index';
import nissanDirectorChair from './nissan/index';
import parkerDirectorChair from './parker/index';
import tridentDirectorChair from './trident/index';
import bigBossGoldDirectorChair from './bigboss-gold-director-chair/index';


const directorSeries: ProductSeries = {
  id: 'director-series',
  title: 'Director Series',
  description: 'Premium chairs for directors and visionaries.',
  seoDescription: 'The Director Series: a poetic union of authority and comfort, designed for those who lead with vision. Each chair is a statement of presence and refined taste.',
  coverImage: {
    url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
    alt: 'Director Series Chair Collection',
    width: 1200,
    height: 800
  },
  products: {
    [ashleyDirectorChair.id]: ashleyDirectorChair,
    [operaDirectorChair.id]: operaDirectorChair,
    [tycoonDirectorChair.id]: tycoonDirectorChair,
    [woodlandDirectorChair.id]: woodlandDirectorChair,
    [bostonDirectorChair.id]: bostonDirectorChair,
    [grandezzaDirectorChair.id]: grandezzaDirectorChair,
    [kotakDirectorChair.id]: kotakDirectorChair,
    [milanoDirectorChair.id]: milanoDirectorChair,
    [monarchDirectorChair.id]: monarchDirectorChair,
    [nissanDirectorChair.id]: nissanDirectorChair,
    [parkerDirectorChair.id]: parkerDirectorChair,
    [tridentDirectorChair.id]: tridentDirectorChair,
    [bigBossGoldDirectorChair.id]: bigBossGoldDirectorChair
    
  }
};

export default directorSeries;