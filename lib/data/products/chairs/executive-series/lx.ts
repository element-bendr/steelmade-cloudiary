import { ExtendedProductData } from "../../product-types";

export const lxExecutiveChair: ExtendedProductData = {
  id: "lx",
  name: "LX Executive Chair",
  description: "The LX Executive Chair embodies modern luxury and ergonomic excellence, offering both high-back and mid-back options for tailored executive comfort.",
  category: "chairs",
  seriesId: "executive-series",
  inStock: true,
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800988/steelmade/chairs/executive-series/lx/ic-51-hb.jpg",
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800988/steelmade/chairs/executive-series/lx/ic-51-hb.jpg", alt: "LX Executive Chair - High Back", width: 800, height: 600 },
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800983/steelmade/chairs/executive-series/lx/ic-52-mb.jpg", alt: "LX Executive Chair - Mid Back", width: 800, height: 600 }
  ],
  features: [
    "Sculpted, contemporary silhouette",
    "Premium upholstery with plush cushioning",
    "Ergonomic lumbar and neck support",
    "Available in high-back and mid-back variants",
    "A chair for those who value both style and substance"
  ],
  specifications: {},
  variants: [
    {
      variantId: "lx-hb",
      variantName: "High Back",
      name: "LX Executive Chair - High Back",
      description: "High back variant for maximum executive presence and support.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800988/steelmade/chairs/executive-series/lx/ic-51-hb.jpg",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: "lx-mb",
      variantName: "Mid Back",
      name: "LX Executive Chair - Mid Back",
      description: "Mid back variant for agile comfort and modern style.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749800983/steelmade/chairs/executive-series/lx/ic-52-mb.jpg",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
