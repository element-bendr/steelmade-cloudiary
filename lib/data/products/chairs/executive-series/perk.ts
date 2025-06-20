import { ExtendedProductData } from "../../product-types";

export const perkExecutiveChair: ExtendedProductData = {
  id: "perk",
  name: "Perk Executive Chair",
  description: "The Perk Executive Chair is designed for simplicity, comfort, and everyday executive use.",
  category: "chairs",
  seriesId: "executive-series",
  inStock: true,
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461908/steelmade/chairs/executive-series/perk/ic-33.jpg",
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461908/steelmade/chairs/executive-series/perk/ic-33.jpg", alt: "Perk Executive Chair", width: 800, height: 600 }
  ],
  features: [
    "Simple, ergonomic design",
    "Comfortable for daily use",
    "A chair for practical executives"
  ],
  specifications: {},
  variants: [
    {
      variantId: "perk-main",
      variantName: "Standard",
      name: "Perk Executive Chair",
      description: "Everyday comfort and executive simplicity.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749461908/steelmade/chairs/executive-series/perk/ic-33.jpg",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
