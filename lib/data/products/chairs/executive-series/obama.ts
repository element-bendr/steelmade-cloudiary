import { ExtendedProductData } from "../../product-types";

export const obamaExecutiveChair: ExtendedProductData = {
  id: "obama",
  name: "Obama Executive Chair",
  description: "The Obama Executive Chair delivers a blend of classic authority and modern ergonomic comfort, available in both high-back and mid-back options for versatile executive support.",
  category: "chairs",
  seriesId: "executive-series",
  inStock: true,
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639074/steelmade/chairs/executive-series/obama/ic-302-hb.png",
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639074/steelmade/chairs/executive-series/obama/ic-302-hb.png", alt: "Obama Executive Chair - High Back", width: 800, height: 600 },
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639075/steelmade/chairs/executive-series/obama/ic-303-mb.png", alt: "Obama Executive Chair - Mid Back", width: 800, height: 600 }
  ],
  features: [
    "Classic executive silhouette with modern lines",
    "Premium upholstery and cushioning",
    "Ergonomic lumbar and neck support",
    "Available in high-back and mid-back variants",
    "A chair for leaders who value tradition and innovation"
  ],
  specifications: {},
  variants: [
    {
      variantId: "obama-hb",
      variantName: "High Back",
      name: "Obama Executive Chair - High Back",
      description: "High back variant for commanding presence and full support.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639074/steelmade/chairs/executive-series/obama/ic-302-hb.png",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: "obama-mb",
      variantName: "Mid Back",
      name: "Obama Executive Chair - Mid Back",
      description: "Mid back variant for agile comfort and classic style.",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749639075/steelmade/chairs/executive-series/obama/ic-303-mb.png",
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  price: '0'
};
