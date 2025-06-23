import { ExtendedProductData } from "@/lib/data/product-types";

export const commanderExecutiveChair: ExtendedProductData = {
  id: "commander-chair",
  name: "Commander Executive Chair",
  description: "The Commander Executive Chair is designed for those who lead with vision and authority. Its bold lines and ergonomic support inspire confidence in every decision.",
  category: "chairs",
  seriesId: "executive-series",
  inStock: true,
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800761/steelmade/chairs/executive-series/commander/ic-50-hb.jpg",
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800761/steelmade/chairs/executive-series/commander/ic-50-hb.jpg", alt: "Commander Executive Chair - High Back", width: 800, height: 600 },
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800765/steelmade/chairs/executive-series/commander/ic-49-mb.jpg", alt: "Commander Executive Chair - Mid Back", width: 800, height: 600 }
  ],
  features: [
    "Bold, sculpted backrest for commanding presence",
    "Premium upholstery for all-day comfort",
    "Ergonomic design with executive support",
    "Available in high-back and mid-back variants",
    "A chair for leaders who inspire and direct"
  ],
  specifications: {},
  variants: [
    {
      variantId: "commander-hb",
      variantName: "High Back",
      name: "Commander Executive Chair - High Back",
      description: "High back variant for maximum support and presence.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800761/steelmade/chairs/executive-series/commander/ic-50-hb.jpg",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: "commander-mb",
      variantName: "Mid Back",
      name: "Commander Executive Chair - Mid Back",
      description: "Mid back variant for agile comfort and style.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800765/steelmade/chairs/executive-series/commander/ic-49-mb.jpg",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
