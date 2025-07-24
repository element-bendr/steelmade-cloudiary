import { ProductSeries } from '../../../product-types';
import visitorClassicChair from './classic/index';
import visitorVenusVistaChair from './venus-vista/index';
import visitorRegencyChair from './regency/index';
import visitorLibertyChair from './liberty/index';
import visitorFloraChair from './flora/index';
import visitorTitanChair from './titan/index';

export const visitorSeries: ProductSeries = {
  id: 'visitor-series',
  title: 'Visitor Series',
  description: 'Chairs designed to welcome guests with comfort and style.',
  seoDescription: 'The Visitor Series: a poetic embrace for every guest, blending hospitality and elegance in every detail.',
  coverImage: {
    url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/visitor-series/classic.png',
    alt: 'Visitor Series Chair Collection',
    width: 1200,
    height: 800
  },
  products: {
    [visitorClassicChair.id]: visitorClassicChair,
    [visitorVenusVistaChair.id]: visitorVenusVistaChair,
    [visitorRegencyChair.id]: visitorRegencyChair,
    [visitorLibertyChair.id]: visitorLibertyChair,
    [visitorFloraChair.id]: visitorFloraChair,
    [visitorTitanChair.id]: visitorTitanChair
  }
};

export default visitorSeries;
