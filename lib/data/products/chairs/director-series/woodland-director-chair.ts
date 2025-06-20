import { ExtendedProductData } from "@/lib/data/product-types";

export const woodlandDirectorChair: ExtendedProductData = {
  id: "woodland-director-chair",
  name: "Woodland Director Chair",
  description: "The Woodland Director Chair combines natural-inspired design with executive comfort, featuring premium materials and ergonomic support.",
  price: "₦0.00", // Price to be determined
  category: "director-series",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg",
  gallery: [
    {
      url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg",
      alt: "Woodland Director Chair - High Back"
    },
    {
      url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-339-mb.jpg",
      alt: "Woodland Director Chair - Medium Back"
    }
  ],
  variants: [
    {
      id: "high-back",
      name: "High Back",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg"
    },
    {
      id: "medium-back",
      name: "Medium Back",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-339-mb.jpg"
    }
  ],
  features: [
    "Natural-inspired design elements",
    "Premium leather upholstery",
    "Ergonomic lumbar support",
    "Adjustable height and tilt",
    "Swivel mechanism",
    "Durable hardwood accents",
    "Executive styling"
  ]
};

export default woodlandDirectorChair;