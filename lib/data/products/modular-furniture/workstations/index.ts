import { ProductSeries } from '../../../product-types';
import marvelWorkstation from './marvel-workstation/index';
import elevateSeries from './elevate-series/index';
import neoSeries from './neo-series/index';
import neoEcoSeries from './neo-eco-series/index';
import sparkSeries from './spark-series/index';
import curveSeries from './curve-series/index';
import impressSeries from './impress-series/index';
import impactSeries from './impact-series/index';
import rockSeries from './rock-series/index';
import hexaSeries from './hexa-series/index';
import eliteSeries from './elite-series/index';
 

export const workstationsSeries: ProductSeries = {
  id: 'workstations',
  title: 'Workstations',
  description: 'Modular workstations for modern offices and collaborative spaces.',
  seoDescription: 'Explore modular workstations designed for productivity, style, and flexibility.',
  coverImage: {
    url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355103/steelmade/workstations/desk%20based%20workstation%20legs/marvel-series01.png',
    alt: 'Marvel Series Desk-Based Workstation',
    width: 1200,
    height: 800
  },
  products: {
    [marvelWorkstation.id]: marvelWorkstation,
    [elevateSeries.id]: elevateSeries,
    [neoSeries.id]: neoSeries,
    [neoEcoSeries.id]: neoEcoSeries,
    [sparkSeries.id]: sparkSeries,
    [curveSeries.id]: curveSeries
    ,
    [impressSeries.id]: impressSeries
    ,
    [impactSeries.id]: impactSeries
    ,
    [rockSeries.id]: rockSeries
    ,
    [hexaSeries.id]: hexaSeries
    ,
    [eliteSeries.id]: eliteSeries
     
  }
};

export default workstationsSeries;
