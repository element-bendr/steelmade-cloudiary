import { Series } from "@/components/portfolio/types";
import { getPortfolioSeries } from "./product-catalog";

// Use the helper function from our consolidated data source
export const portfolioSeries: Series[] = getPortfolioSeries();
