import { ProductSeries } from "../../product-types";

export const executiveSeries: ProductSeries = {
  id: "executive-series",
  title: "Executive Series",
  description: "Premium executive seating designed for comfort and prestige in corporate environments.",
  seoDescription: "Discover our Executive Series - premium chairs combining ergonomics, luxury materials, and sophisticated design for executive offices.",
  category: "chairs",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/collection-cover.webp",
  coverImage: { 
    url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/collection-cover.webp", 
    alt: "Executive Series Collection", 
    width: 800, 
    height: 600 
  },
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/collection-detail.webp", alt: "Executive Series Detail", width: 800, height: 600 }
  ],
  features: ["Premium Materials", "Ergonomic Design", "Executive Styling"],
  lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
  products: {
    "executive-pro-chair": {
      id: "executive-pro-chair",
      name: "Executive Pro Chair",
      description: "Ultimate comfort meets sophisticated design with multiple adjustability options and premium leather upholstery.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/pro/ec-501-main.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/pro/ec-501-main.webp", alt: "Executive Pro Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/pro/ec-501-angle.webp", alt: "Executive Pro Chair Side View", width: 800, height: 600 }
      ],
      features: ["Premium leather upholstery", "Multi-function mechanism", "Aluminum base", "Adjustable headrest"],
      specifications: {
        "Material": "Premium leather and polished aluminum",
        "Weight Capacity": "350 lbs",
        "Warranty": "10-year limited warranty"
      },
      variants: [
        {
          variantId: "ec-501-blk",
          variantName: "Black Leather",
          name: "Executive Pro Chair - Black Leather",
          description: "Executive Pro Chair with premium black leather upholstery.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/pro/ec-501-blk.webp",
          specifications: {
            "Color": "Black",
            "Material": "Premium leather",
            "Base": "Polished aluminum"
          }
        },
        {
          variantId: "ec-501-brn",
          variantName: "Brown Leather",
          name: "Executive Pro Chair - Brown Leather",
          description: "Executive Pro Chair with premium brown leather upholstery.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/pro/ec-501-brn.webp",
          specifications: {
            "Color": "Brown",
            "Material": "Premium leather",
            "Base": "Polished aluminum"
          }
        }
      ]
    },
    "executive-elite-chair": {
      id: "executive-elite-chair",
      name: "Executive Elite Chair",
      description: "The pinnacle of executive seating with hand-finished leather, custom stitching, and exclusive features.",
      category: "chairs",
      seriesId: "executive-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/elite/ec-701-main.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/elite/ec-701-main.webp", alt: "Executive Elite Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/elite/ec-701-detail.webp", alt: "Executive Elite Chair Detail", width: 800, height: 600 }
      ],
      features: ["Hand-finished premium leather", "Executive recline function", "Heated seat option", "Solid wood accents"],
      specifications: {
        "Material": "Top-grain leather and walnut wood accents",
        "Weight Capacity": "400 lbs",
        "Warranty": "Lifetime limited warranty"
      },
      variants: [
        {
          variantId: "ec-701-blk",
          variantName: "Black Premium Leather",
          name: "Executive Elite Chair - Black Premium Leather",
          description: "The ultimate executive chair with black top-grain leather upholstery.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/elite/ec-701-blk.webp",
          specifications: {
            "Color": "Black",
            "Material": "Top-grain leather",
            "Accents": "Walnut wood"
          }
        },
        {
          variantId: "ec-701-bgd",
          variantName: "Burgundy Premium Leather",
          name: "Executive Elite Chair - Burgundy Premium Leather",
          description: "The ultimate executive chair with burgundy top-grain leather upholstery.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/executive-series/elite/ec-701-bgd.webp",
          specifications: {
            "Color": "Burgundy",
            "Material": "Top-grain leather",
            "Accents": "Walnut wood"
          }
        }
      ]
    }
  }
};