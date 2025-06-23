import { ExtendedProductData } from "@/lib/data/product-types";

export const skodaExecutiveChair: ExtendedProductData = {
  id: "skoda-executive-chair",
  name: "Skoda Executive Chair",
  description:
    "A versatile executive chair available in high back, low back, and visitor variants. Modern design and ergonomic comfort for executive offices.",
  category: "chairs",
  seriesId: "executive-series",
  inStock: true,
  imageUrl:
    "https://res.cloudinary.com/dqde19mfs/image/upload/v1750409940/steelmade/chairs/executive-series/skoda/ic-94-hb.jpg",
  images: [
    {
      url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1750409940/steelmade/chairs/executive-series/skoda/ic-94-hb.jpg",
      alt: "Skoda Executive Chair High Back",
      width: 800,
      height: 600,
    },
    {
      url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1750409945/steelmade/chairs/executive-series/skoda/ic-95-lb.jpg",
      alt: "Skoda Executive Chair Low Back",
      width: 800,
      height: 600,
    },
    {
      url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1750409951/steelmade/chairs/executive-series/skoda/ic-96-visitor.jpg",
      alt: "Skoda Executive Chair Visitor",
      width: 800,
      height: 600,
    },
  ],
  features: [
    "Available in High Back, Low Back, and Visitor models",
    "Ergonomic design",
    "Modern styling",
    "Durable construction",
  ],
  specifications: {
    Type: "Executive Chair",
    Variants: "High Back, Low Back, Visitor",
    Warranty: "5-year limited warranty",
  },
  variants: [
    {
      variantId: "ic-94-hb",
      variantName: "High Back",
      name: "Skoda Executive Chair - High Back",
      description: "High back model for maximum support and comfort.",
      imageUrl:
        "https://res.cloudinary.com/dqde19mfs/image/upload/v1750409940/steelmade/chairs/executive-series/skoda/ic-94-hb.jpg",
      specifications: {
        "Back Height": "High",
        Material: "Premium upholstery",
        Base: "Polished aluminum",
      },
    },
    {
      variantId: "ic-95-lb",
      variantName: "Low Back",
      name: "Skoda Executive Chair - Low Back",
      description:
        "Low back model for a more compact executive seating option.",
      imageUrl:
        "https://res.cloudinary.com/dqde19mfs/image/upload/v1750409945/steelmade/chairs/executive-series/skoda/ic-95-lb.jpg",
      specifications: {
        "Back Height": "Low",
        Material: "Premium upholstery",
        Base: "Polished aluminum",
      },
    },
    {
      variantId: "ic-96-visitor",
      variantName: "Visitor",
      name: "Skoda Executive Chair - Visitor",
      description: "Visitor model for guest seating in executive offices.",
      imageUrl:
        "https://res.cloudinary.com/dqde19mfs/image/upload/v1750409951/steelmade/chairs/executive-series/skoda/ic-96-visitor.jpg",
      specifications: {
        "Back Height": "Visitor",
        Material: "Premium upholstery",
        Base: "Fixed legs",
      },
    },
  ],
};
