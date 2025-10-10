import { ProductSeries } from "../../product-types";

export const modularStorage: ProductSeries = {
  id: 'modular-storage',
  title: 'Storage Solutions',
  description: 'Versatile storage options for efficient office organization.',
  seoDescription: 'Discover our versatile Storage Solutions for efficient office organization and space optimization.',
  category: 'storage-solutions',
  imageUrl: "/images/storage.jpg",
  coverImage: { url: "/images/storage.jpg", alt: "Storage Solutions", width: 800, height: 600 },
  images: [{ url: "/images/storage-detail.jpg", alt: "Storage Solutions detail", width: 800, height: 600 }],
  features: ["Modular Design", "Space Optimization", "Organization"],
  lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
  products: {
    "modcabinet": {
      id: "modcabinet",
      name: "ModCabinet",
      description: "Modular filing cabinet system with customizable compartments.",
      category: "storage-solutions",
      seriesId: "modular-storage",
      inStock: true,
      imageUrl: "/images/modcabinet.jpg",
      images: [
        { url: "/images/modcabinet.jpg", alt: "ModCabinet", width: 800, height: 600 }
      ],
      features: ["Customizable compartments", "Modular design", "Filing system"],
      specifications: {
        "Material": "Steel and engineered wood",
        "Warranty": "5-year warranty"
      },
      variants: [
        {
          variantId: "modcabinet-2drawer",
          variantName: "2-Drawer",
          name: "ModCabinet - 2-Drawer",
          description: "Compact 2-drawer ModCabinet for smaller spaces.",
          imageUrl: "/images/modcabinet-2drawer.jpg",
          specifications: {
            "Drawers": "2",
            "Dimensions": "15\" W x 22\" D x 28\" H"
          }
        },
        {
          variantId: "modcabinet-4drawer",
          variantName: "4-Drawer",
          name: "ModCabinet - 4-Drawer",
          description: "Standard 4-drawer ModCabinet for comprehensive storage.",
          imageUrl: "/images/modcabinet-4drawer.jpg",
          specifications: {
            "Drawers": "4",
            "Dimensions": "15\" W x 22\" D x 52\" H"
          }
        }
      ]
    },
    "wallstore": {
      id: "wallstore",
      name: "WallStore",
      description: "Wall-mounted storage solution to maximize floor space.",
      category: "storage-solutions",
      seriesId: "modular-storage",
      inStock: true,
      imageUrl: "/images/wallstore.jpg",
      images: [
        { url: "/images/wallstore.jpg", alt: "WallStore", width: 800, height: 600 }
      ],
      features: ["Wall-mounted", "Space-saving", "Modern design"],
      specifications: {
        "Material": "Aluminum and glass",
        "Warranty": "2-year warranty"
      },
      variants: [
        {
          variantId: "wallstore-single",
          variantName: "Single Unit",
          name: "WallStore - Single Unit",
          description: "Individual WallStore unit for focused storage needs.",
          imageUrl: "/images/wallstore-single.jpg",
          specifications: {
            "Type": "Single unit",
            "Dimensions": "24\" W x 12\" D x 24\" H"
          }
        },
        {
          variantId: "wallstore-triple",
          variantName: "Triple Unit",
          name: "WallStore - Triple Unit",
          description: "Expanded WallStore with three connected compartments.",
          imageUrl: "/images/wallstore-triple.jpg",
          specifications: {
            "Type": "Triple unit",
            "Dimensions": "72\" W x 12\" D x 24\" H"
          }
        }
      ]
    }
  }
};