import { ProductCatalog } from "../product-types";
import { chairs } from "./chairs";
import { desks } from "./desks";
import { storage } from "./storage";

export { chairs, desks, storage };

export const products: ProductCatalog = {
  chairs,
  desks,
  storage,
  "hospital-furniture": {},
  "school-furniture": {},
  "racking-systems": {},
  "modular-furniture": {},
  "office-accessories": {},
};