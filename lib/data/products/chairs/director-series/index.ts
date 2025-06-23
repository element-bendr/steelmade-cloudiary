import { ExtendedProductData } from '../../../product-types';
import ashleyDirectorChair from './ashley';
import operaDirectorChair from './opera';
import tycoonDirectorChair from './tycoon';
import woodlandDirectorChair from './woodland';
import bostonDirectorChair from './boston';
import grandezzaDirectorChair from './grandezza';
import kotakDirectorChair from './kotak';
import milanoDirectorChair from './milano';
import monarchDirectorChair from './monarch';
import nissanDirectorChair from './nissan';
import parkerDirectorChair from './parker';
import tridentDirectorChair from './trident';

export const directorSeriesChairs: Record<string, ExtendedProductData> = {
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
  [tridentDirectorChair.id]: tridentDirectorChair
};
