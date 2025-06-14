import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Steelmade Office Furniture",
  description: "Browse our exclusive collections of office furniture including executive chairs, ergonomic desks, and premium storage solutions.",
  keywords: [
    "office furniture collections",
    "executive chairs",
    "ergonomic desks",
    "storage solutions",
    "premium office furniture",
    "designer office collections"
  ],
  openGraph: {
    title: "Office Furniture Collections | Steelmade",
    description: "Discover our premium collections of office furniture designed for modern workspaces.",
    type: "website",
    images: [
      {
        url: "/images/collections/placeholder-collection.webp",
        width: 800,
        height: 600,
        alt: "Steelmade Office Furniture Collections"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Office Furniture Collections | Steelmade",
    description: "Discover our premium collections of office furniture designed for modern workspaces.",
    images: ["/images/collections/placeholder-collection.webp"]
  }
};
