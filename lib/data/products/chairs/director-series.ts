import { ProductSeries } from "../../product-types";

export const directorSeries: ProductSeries = {
  id: "director-series",
  title: "Director Series",
  description: "Professional director chairs offering versatile and durable seating solutions for film sets and productions.",
  seoDescription: "Discover our Director Series - premium, durable, and stylish seating for professional film sets and productions.",
  category: "chairs",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-cover.webp",
  coverImage: { 
    url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-cover.webp", 
    alt: "Director Series Collection", 
    width: 800, 
    height: 600 
  },
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-detail.webp", alt: "Director Series Detail", width: 800, height: 600 }
  ],
  features: ["Professional Design", "Durable Construction", "Multiple Configurations"],
  lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
  products: {
    "ashley-director-chair": {
      id: "ashley-director-chair",
      name: "Ashley Director Chair",
      description: "The Ashley Director Chair offers versatile and durable seating solutions for professional environments, available in high-back and mid-back configurations.",
      category: "chairs",
      seriesId: "director-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp", alt: "Ashley High-Back Director Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-362-mb.webp", alt: "Ashley Mid-Back Director Chair", width: 800, height: 600 }
      ],
      features: ["Reinforced aluminum frame", "Extra-wide seating", "Premium leather armrests", "Multiple back heights"],
      specifications: {
        "Material": "Aircraft-grade aluminum and canvas",
        "Warranty": "5-year limited warranty"
      },
      variants: [
        {
          variantId: "ic-361-hb",
          variantName: "High-Back",
          name: "Ashley High-Back Director Chair IC-361-HB",
          description: "Premium high-back version of the Ashley Director Chair for maximum comfort and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
          specifications: {
            "Height": "45 inches",
            "Weight Capacity": "300 lbs",
            "Frame": "Aircraft-grade aluminum"
          }
        },
        {
          variantId: "ic-362-mb",
          variantName: "Mid-Back",
          name: "Ashley Mid-Back Director Chair IC-362-MB",
          description: "Versatile mid-back version of the Ashley Director Chair offering excellent mobility and comfort.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-362-mb.webp",
          specifications: {
            "Height": "38 inches",
            "Weight Capacity": "300 lbs",
            "Frame": "Aircraft-grade aluminum"
          }
        }
      ]
    },
    "milano-director-chair": {
      id: "milano-director-chair",
      name: "Milano Director Chair",
      description: "Elegant director chair with premium features, available in high-back and mid-back configurations.",
      category: "chairs",
      seriesId: "director-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-251-hb.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-251-hb.webp", alt: "Milano High-Back Director Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-252-mb.webp", alt: "Milano Mid-Back Director Chair", width: 800, height: 600 }
      ],
      features: ["Lightweight design", "Quick-fold mechanism", "Water-resistant canvas", "Multiple back heights"],
      specifications: {
        "Material": "Aircraft-grade aluminum and canvas",
        "Warranty": "5-year limited warranty"
      },
      variants: [
        {
          variantId: "ic-251-hb",
          variantName: "High-Back",
          name: "Milano High-Back Director Chair IC-251-HB",
          description: "Premium high-back version of the Milano Director Chair for maximum comfort and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-251-hb.webp",
          specifications: {
            "Height": "44 inches",
            "Weight Capacity": "275 lbs",
            "Frame": "Lightweight aluminum"
          }
        },
        {
          variantId: "ic-252-mb",
          variantName: "Mid-Back",
          name: "Milano Mid-Back Director Chair IC-252-MB",
          description: "Versatile mid-back version of the Milano Director Chair offering excellent mobility and style.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-252-mb.webp",
          specifications: {
            "Height": "36 inches",
            "Weight Capacity": "275 lbs",
            "Frame": "Lightweight aluminum"
          }
        }
      ]
    },
    "trident-director-chair": {
      id: "trident-director-chair",
      name: "Trident Director Chair",
      description: "Professional-grade director chair for demanding environments, available in high-back and mid-back configurations.",
      category: "chairs",
      seriesId: "director-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-249-hb.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-249-hb.webp", alt: "Trident High-Back Director Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-250-mb.webp", alt: "Trident Mid-Back Director Chair", width: 800, height: 600 }
      ],
      features: ["Heavy-duty construction", "Enhanced stability", "Premium materials", "Multiple back heights"],
      specifications: {
        "Material": "Aircraft-grade aluminum and heavy-duty canvas",
        "Warranty": "5-year limited warranty"
      },
      variants: [
        {
          variantId: "ic-249-hb",
          variantName: "High-Back",
          name: "Trident High-Back Director Chair IC-249-HB",
          description: "Premium high-back version of the Trident Director Chair for maximum durability and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-249-hb.webp",
          specifications: {
            "Height": "46 inches",
            "Weight Capacity": "350 lbs",
            "Frame": "Heavy-duty aluminum"
          }
        },
        {
          variantId: "ic-250-mb",
          variantName: "Mid-Back",
          name: "Trident Mid-Back Director Chair IC-250-MB",
          description: "Versatile mid-back version of the Trident Director Chair offering excellent durability and mobility.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-250-mb.webp",
          specifications: {
            "Height": "40 inches",
            "Weight Capacity": "350 lbs",
            "Frame": "Heavy-duty aluminum"
          }
        }
      ]
    },
    "premium-director-chair": {
      id: "premium-director-chair",
      name: "Premium Director Chair",
      description: "Our most luxurious director chair with premium materials and enhanced comfort features. Perfect for extended use on set or in creative spaces.",
      category: "chairs",
      seriesId: "director-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/premium-director-black-front",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/premium-director-black-front", alt: "Premium Director Chair in Black - Front View", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/premium-director-black-side", alt: "Premium Director Chair in Black - Side View", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/premium-director-burgundy-front", alt: "Premium Director Chair in Burgundy - Front View", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/premium-director-burgundy-side", alt: "Premium Director Chair in Burgundy - Side View", width: 800, height: 600 }
      ],
      features: ["Premium leather armrests", "Extra padded seat and back", "Reinforced aluminum frame", "Cup holder and accessory pouch", "Weather-resistant fabric", "Supports up to 350 lbs"],
      specifications: {
        "Weight": "12 lbs",
        "Dimensions": "24\" W x 22\" D x 45\" H",
        "Seat Height": "24 inches",
        "Frame Material": "Aircraft-grade aluminum",
        "Fabric": "600D polyester with leather accents"
      },
      variants: [
        {
          variantId: "black-premium",
          variantName: "Black Premium",
          name: "Black Premium Director Chair",
          description: "Luxurious black premium director chair with enhanced comfort features.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/premium-director-black-front",
          specifications: {
            "Color": "Black",
            "Color Code": "#000000"
          }
        },
        {
          variantId: "burgundy-premium",
          variantName: "Burgundy Premium",
          name: "Burgundy Premium Director Chair",
          description: "Luxurious burgundy premium director chair with enhanced comfort features.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/premium-director-burgundy-front",
          specifications: {
            "Color": "Burgundy",
            "Color Code": "#800020"
          }
        }
      ]
    }
  }
};