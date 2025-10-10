import { ProductSeries } from "../../product-types";

export const designerDesk: ProductSeries = {
  id: 'designer-desk',
  title: 'Designer Desk Collection',
  description: 'Modern desk solutions that combine aesthetics with functionality.',
  seoDescription: 'Explore our Designer Desk Collection featuring modern, functional workspaces with elegant design.',
  category: 'desks',
  imageUrl: "/images/designer-desk.jpg",
  coverImage: { url: "/images/designer-desk.jpg", alt: "Designer Desk Collection", width: 800, height: 600 },
  images: [{ url: "/images/designer-desk-detail.jpg", alt: "Designer Desk detail", width: 800, height: 600 }],
  features: ["Modern Design", "Functional Workspace", "Cable Management"],
  lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
  products: {
    "horizon-desk": {
      id: "horizon-desk",
      name: "Horizon Desk",
      description: "Minimalist design with ample workspace and integrated cable management.",
      category: "desks",
      seriesId: "designer-desk",
      inStock: true,
      imageUrl: "/images/horizon-desk.jpg",
      images: [
        { url: "/images/horizon-desk.jpg", alt: "Horizon Desk", width: 800, height: 600 }
      ],
      features: ["Integrated cable management", "Spacious workspace", "Minimalist design"],
      specifications: {
        "Material": "Engineered wood and steel",
        "Warranty": "2-year warranty"
      },
      variants: [
        {
          variantId: "horizon-oak",
          variantName: "Oak",
          name: "Horizon Desk - Oak",
          description: "Horizon Desk with oak finish.",
          imageUrl: "/images/horizon-desk-oak.jpg",
          specifications: {
            "Finish": "Oak",
            "Dimensions": "60\" W x 30\" D x 29\" H"
          }
        },
        {
          variantId: "horizon-walnut",
          variantName: "Walnut",
          name: "Horizon Desk - Walnut",
          description: "Horizon Desk with walnut finish.",
          imageUrl: "/images/horizon-desk-walnut.jpg",
          specifications: {
            "Finish": "Walnut",
            "Dimensions": "60\" W x 30\" D x 29\" H"
          }
        }
      ]
    },
    "apex-workstation": {
      id: "apex-workstation",
      name: "Apex Workstation",
      description: "Adjustable height desk with smart connectivity options.",
      category: "desks",
      seriesId: "designer-desk",
      inStock: true,
      imageUrl: "/images/apex-workstation.jpg",
      images: [
        { url: "/images/apex-workstation.jpg", alt: "Apex Workstation", width: 800, height: 600 }
      ],
      features: ["Height adjustable", "Smart connectivity", "Modern design"],
      specifications: {
        "Material": "Steel and glass",
        "Warranty": "3-year warranty"
      },
      variants: [
        {
          variantId: "apex-black",
          variantName: "Black",
          name: "Apex Workstation - Black",
          description: "Apex Workstation with black frame and smoked glass top.",
          imageUrl: "/images/apex-workstation-black.jpg",
          specifications: {
            "Frame": "Black",
            "Top": "Smoked glass",
            "Dimensions": "60\" W x 30\" D x 29-45\" H"
          }
        },
        {
          variantId: "apex-white",
          variantName: "White",
          name: "Apex Workstation - White",
          description: "Apex Workstation with white frame and clear glass top.",
          imageUrl: "/images/apex-workstation-white.jpg",
          specifications: {
            "Frame": "White",
            "Top": "Clear glass",
            "Dimensions": "60\" W x 30\" D x 29-45\" H"
          }
        }
      ]
    }
  }
};