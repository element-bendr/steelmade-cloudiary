import { ExtendedProductData } from "../../../product-types";
import { berlinErgonomicChair } from "./berlin";
import { rogerErgonomicChair } from "./roger";
import { udErgonomicChair } from "./ud";

export const ergonomicSeriesProducts: Record<string, ExtendedProductData> = {
  [berlinErgonomicChair.id]: berlinErgonomicChair,
  [rogerErgonomicChair.id]: rogerErgonomicChair,
  [udErgonomicChair.id]: udErgonomicChair
};
