import { ProductSeries } from "../../product-types";
import { ergonomicSeriesProducts } from "./ergonomic-series/index";

export const ergonomicSeries: ProductSeries = {
  id: "ergonomic-series",
  title: "Ergonomic Series",
  description: "Science-backed ergonomic designs that promote comfort and wellness during extended periods of sitting.",
  seoDescription: "The Ergonomic Series: where science meets comfort. Designed for wellness, these chairs support your posture and productivity with poetic precision.",
  coverImage: {
    url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png",
    alt: "Ergonomic Series Chair Collection",
    width: 1200,
    height: 800
  },
  category: "chairs",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png",
  features: [
    "Ergonomic support for modern workspaces",
    "Multiple variants for personalized comfort",
    "Premium materials and finishes",
    "Designed for posture and wellness",
    "Minimal, poetic, and modular design"
  ],
  lastModified: new Date().toISOString(),
  products: ergonomicSeriesProducts
};