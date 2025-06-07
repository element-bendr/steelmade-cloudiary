import { ProductSeries } from "../../product-types";

export const ergonomicSeries: ProductSeries = {
  id: "ergonomic-series",
  title: "Ergonomic Series",
  description: "Science-backed ergonomic designs that promote comfort and wellness during extended periods of sitting.",
  seoDescription: "Experience our Ergonomic Series - chairs scientifically designed to provide maximum comfort and support for better posture and reduced fatigue.",
  category: "chairs",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/collection-cover.webp",
  coverImage: { 
    url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/collection-cover.webp", 
    alt: "Ergonomic Series Collection", 
    width: 800, 
    height: 600 
  },
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/collection-detail.webp", alt: "Ergonomic Series Detail", width: 800, height: 600 }
  ],
  features: ["Advanced Ergonomics", "Adjustability", "Breathable Materials"],
  lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
  products: {
    "ergo-mesh-pro": {
      id: "ergo-mesh-pro",
      name: "Ergo Mesh Pro",
      description: "Advanced ergonomic chair with breathable mesh and comprehensive adjustment features to support proper posture.",
      category: "chairs",
      seriesId: "ergonomic-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/mesh-pro/eg-301-main.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/mesh-pro/eg-301-main.webp", alt: "Ergo Mesh Pro Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/mesh-pro/eg-301-back.webp", alt: "Ergo Mesh Pro Chair Back View", width: 800, height: 600 }
      ],
      features: ["Dynamic lumbar support", "4D adjustable armrests", "Breathable mesh backrest", "Adjustable headrest"],
      specifications: {
        "Material": "Premium mesh and high-grade polymer",
        "Weight Capacity": "300 lbs",
        "Warranty": "7-year limited warranty"
      },
      variants: [
        {
          variantId: "eg-301-blk",
          variantName: "Black Mesh",
          name: "Ergo Mesh Pro - Black",
          description: "Ergo Mesh Pro with black mesh backrest and fabric seat.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/mesh-pro/eg-301-blk.webp",
          specifications: {
            "Color": "Black",
            "Backrest": "Premium mesh",
            "Seat": "High-density foam with fabric upholstery"
          }
        },
        {
          variantId: "eg-301-gry",
          variantName: "Grey Mesh",
          name: "Ergo Mesh Pro - Grey",
          description: "Ergo Mesh Pro with grey mesh backrest and fabric seat.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/mesh-pro/eg-301-gry.webp",
          specifications: {
            "Color": "Grey",
            "Backrest": "Premium mesh",
            "Seat": "High-density foam with fabric upholstery"
          }
        }
      ]
    },
    "ergo-lumbar-elite": {
      id: "ergo-lumbar-elite",
      name: "Ergo Lumbar Elite",
      description: "Premium ergonomic chair featuring advanced dynamic lumbar support and customizable settings for optimal comfort.",
      category: "chairs",
      seriesId: "ergonomic-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/lumbar-elite/eg-401-main.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/lumbar-elite/eg-401-main.webp", alt: "Ergo Lumbar Elite Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/lumbar-elite/eg-401-side.webp", alt: "Ergo Lumbar Elite Chair Side View", width: 800, height: 600 }
      ],
      features: ["Adaptive lumbar technology", "Memory foam seat", "Synchronized tilt mechanism", "Weight-sensitive recline"],
      specifications: {
        "Material": "Engineered mesh and premium fabric",
        "Weight Capacity": "350 lbs",
        "Warranty": "10-year limited warranty"
      },
      variants: [
        {
          variantId: "eg-401-blk",
          variantName: "Black",
          name: "Ergo Lumbar Elite - Black",
          description: "Ergo Lumbar Elite in black with advanced adaptive lumbar support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/lumbar-elite/eg-401-blk.webp",
          specifications: {
            "Color": "Black",
            "Lumbar Support": "Adaptive dynamic technology",
            "Seat": "Memory foam with premium fabric"
          }
        },
        {
          variantId: "eg-401-blu",
          variantName: "Blue",
          name: "Ergo Lumbar Elite - Blue",
          description: "Ergo Lumbar Elite in blue with advanced adaptive lumbar support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/ergonomic-series/lumbar-elite/eg-401-blu.webp",
          specifications: {
            "Color": "Blue",
            "Lumbar Support": "Adaptive dynamic technology",
            "Seat": "Memory foam with premium fabric"
          }
        }
      ]
    }
  }
};