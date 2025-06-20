import { ProductSeries } from "../../product-types";
import { ergonomicSeriesProducts } from "./ergonomic-series/index";

export const ergonomicSeries: ProductSeries = {
  id: "ergonomic-series",
  title: "Ergonomic Series",
  description: "Science-backed ergonomic designs that promote comfort and wellness during extended periods of sitting.",
  category: "chairs",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/collection-cover.webp",
  coverImage: {
    url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/collection-cover.webp",
    alt: "Ergonomic Series Collection",
    width: 800,
    height: 600
  },
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