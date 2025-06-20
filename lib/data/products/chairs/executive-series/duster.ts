import { ExtendedProductData } from "../../product-types";

export const dusterExecutiveChair: ExtendedProductData = {
  id: "duster",
  name: "Duster Executive Chair",
  description: "The Duster Executive Chair features a bold, high-back design for maximum support and a modern executive look.",
  category: "chairs",
  seriesId: "executive-series",
  inStock: true,
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619677/steelmade/chairs/executive-series/duster/ic-36-hb.jpg",
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619677/steelmade/chairs/executive-series/duster/ic-36-hb.jpg", alt: "Duster Executive Chair - High Back", width: 800, height: 600 }
  ],
  features: [
    "High-back for full executive support",
    "Modern, bold styling",
    "Plush cushioning for all-day comfort",
    "A chair for leaders who stand tall"
  ],
  specifications: {},
  variants: [
    {
      variantId: "duster-hb",
      variantName: "High Back",
      name: "Duster Executive Chair - High Back",
      description: "High back variant for commanding presence and support.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749619677/steelmade/chairs/executive-series/duster/ic-36-hb.jpg",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
