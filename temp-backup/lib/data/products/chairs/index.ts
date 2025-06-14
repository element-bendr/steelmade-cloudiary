import { ProductCatalog } from "../../product-types";
import { directorSeries } from "./director-series";
import { ergonomicSeries } from "./ergonomic-series";
import { executiveSeries } from "./executive-series";

export const chairs: ProductCatalog["chairs"] = {
  "director-series": directorSeries,
  "ergonomic-series": ergonomicSeries,
  "executive-series": executiveSeries,
};