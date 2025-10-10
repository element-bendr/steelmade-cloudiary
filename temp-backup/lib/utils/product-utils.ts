// Simple utility functions for product data retrieval

// Local type definitions without external imports
interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string>;
}

export interface ExtendedProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  seriesId: string;
  inStock: boolean;
  imageUrl: string;
  images?: ProductImage[];
  features?: string[];
  specifications?: Record<string, string>;
  variants: ProductVariant[];
}

export interface ProductSeries {
  id: string;
  title: string;
  description: string;
  category: string;
  features?: string[];
  specifications?: Record<string, string>;
  products: Record<string, ExtendedProductData>;
}

// Mock data for products and series
const mockData: Record<string, Record<string, Record<string, ExtendedProductData>>> = {
  chairs: {
    "director-series": {
      "ashley-director-chair": {
        id: "ashley-director-chair",
        name: "Ashley Director Chair",
        description: "A premium director chair with ergonomic design",
        category: "chairs",
        seriesId: "director-series",
        inStock: true,
        imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
        features: [
          "Ergonomic design for maximum comfort",
          "Premium materials",
          "Adjustable height",
          "Swivel base"
        ],
        specifications: {
          "Height": "48-52 inches",
          "Width": "26 inches",
          "Depth": "28 inches",
          "Weight Capacity": "300 lbs",
          "Material": "Premium leather and aluminum"
        },
        variants: [
          {
            variantId: "ashley-high-back",
            variantName: "High Back",
            name: "Ashley Director Chair - High Back",
            description: "High back version for maximum support",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
            specifications: {
              "Back Height": "30 inches",
              "Overall Height": "52 inches"
            }
          },
          {
            variantId: "ashley-mid-back",
            variantName: "Mid Back",
            name: "Ashley Director Chair - Mid Back",
            description: "Mid back version for a more streamlined look",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-362-mb.webp",
            specifications: {
              "Back Height": "24 inches",
              "Overall Height": "46 inches"
            }
          }
        ]
      },      "milano-director-chair": {
        id: "milano-director-chair",
        name: "Milano Director Chair",
        description: "An elegant director chair with Italian design",
        category: "chairs",
        seriesId: "director-series",
        inStock: true,
        imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-251-hb.webp",
        features: [
          "Italian design",
          "Premium leather",
          "Adjustable arms",
          "Five-star base"
        ],
        specifications: {
          "Height": "46-50 inches",
          "Width": "25 inches",
          "Depth": "27 inches",
          "Weight Capacity": "275 lbs",
          "Material": "Italian leather and steel"
        },        variants: [
          {
            variantId: "milano-high-back",
            variantName: "High Back",
            name: "Milano Director Chair - High Back",
            description: "High back version with headrest",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-251-hb.webp",
            specifications: {
              "Back Height": "28 inches",
              "Overall Height": "50 inches"
            }
          },
          {
            variantId: "milano-mid-back",
            variantName: "Mid Back",
            name: "Milano Director Chair - Mid Back",
            description: "Mid back version for a more streamlined Italian look",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/milano/ic-252-mb.webp",
            specifications: {
              "Back Height": "22 inches",
              "Overall Height": "44 inches"
            }
          }
        ]
      },"trident-director-chair": {
        id: "trident-director-chair",
        name: "Trident Director Chair",
        description: "A robust director chair with modern design",
        category: "chairs",
        seriesId: "director-series",
        inStock: true,
        imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-249-hb.webp",
        features: [
          "Modern design",
          "High durability",
          "Adjustable lumbar support",
          "360° swivel"
        ],
        specifications: {
          "Height": "47-51 inches",
          "Width": "27 inches",
          "Depth": "29 inches",
          "Weight Capacity": "350 lbs",
          "Material": "Mesh and steel"
        },        variants: [
          {
            variantId: "trident-high-back",
            variantName: "High Back",
            name: "Trident Director Chair - High Back",
            description: "High back version with neck support",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-249-hb.webp",
            specifications: {
              "Back Height": "31 inches",
              "Overall Height": "51 inches"
            }
          },
          {
            variantId: "trident-mid-back",
            variantName: "Mid Back",
            name: "Trident Director Chair - Mid Back",
            description: "Mid back version with enhanced mobility",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/trident/ic-250-mb.webp",
            specifications: {
              "Back Height": "25 inches",
              "Overall Height": "45 inches"
            }
          }
        ]
      },"woodland-director-chair": {
        id: "woodland-director-chair",
        name: "Woodland Director Chair",
        description: "Professional-grade director chair with rustic styling and premium durability, perfect for outdoor film sets and rugged environments.",
        category: "chairs",
        seriesId: "director-series",
        inStock: true,
        imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/woodland/ic-338-hb.webp",
        images: [
          { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/woodland/ic-338-hb.webp", alt: "Woodland High-Back Director Chair", width: 800, height: 600 },
          { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/woodland/ic-339-mb.webp", alt: "Woodland Mid-Back Director Chair", width: 800, height: 600 }
        ],
        features: [
          "Weather-resistant construction",
          "Reinforced joints",
          "All-terrain feet",
          "Multiple back heights",
          "Quick-fold mechanism"
        ],
        specifications: {
          "Material": "Weather-treated aluminum and heavy-duty canvas",
          "Warranty": "5-year limited warranty"
        },
        variants: [
          {
            variantId: "ic-338-hb",
            variantName: "High-Back",
            name: "Woodland High-Back Director Chair IC-338-HB",
            description: "High-back version of the Woodland Director Chair for maximum support in outdoor environments.",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/woodland/ic-338-hb.webp",
            specifications: {
              "Height": "47 inches",
              "Weight Capacity": "325 lbs",
              "Frame": "Weather-treated aluminum"
            }
          },
          {
            variantId: "ic-339-mb",
            variantName: "Mid-Back",
            name: "Woodland Mid-Back Director Chair IC-339-MB",
            description: "Mid-back version of the Woodland Director Chair offering excellent mobility for active film sets.",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/woodland/ic-339-mb.webp",
            specifications: {
              "Height": "41 inches",
              "Weight Capacity": "325 lbs",
              "Frame": "Weather-treated aluminum"
            }
          }
        ]
      },"opera-director-chair": {
        id: "opera-director-chair",
        name: "Opera Director Chair",
        description: "Professional director chair combining elegance and functionality, available in high-back and medium-back configurations.",
        category: "chairs",
        seriesId: "director-series",
        inStock: true,
        imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454969/steelmade/chairs/director-series/opera/ic-340-hb.jpg",
        images: [
          { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454969/steelmade/chairs/director-series/opera/ic-340-hb.jpg", alt: "Opera High-Back Director Chair", width: 800, height: 600 },
          { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454891/steelmade/chairs/director-series/opera/ic-341-mb.jpg", alt: "Opera Medium-Back Director Chair", width: 800, height: 600 }
        ],
        features: [
          "Premium build quality",
          "Multiple back height options",
          "Enhanced comfort padding",
          "Durable construction",
          "Professional styling"
        ],
        specifications: {
          "Material": "Premium grade aluminum and high-quality upholstery",
          "Weight Capacity": "300 lbs",
          "Warranty": "5-year limited warranty"
        },
        variants: [
          {
            variantId: "ic-340-hb",
            variantName: "High Back",
            name: "Opera High-Back Director Chair IC-340-HB",
            description: "Premium high-back version of the Opera Director Chair for superior comfort and support.",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454969/steelmade/chairs/director-series/opera/ic-340-hb.jpg",
            specifications: {
              "Height": "46 inches",
              "Weight Capacity": "300 lbs",
              "Frame": "Premium grade aluminum"
            }
          },
          {
            variantId: "ic-341-mb",
            variantName: "Medium Back",
            name: "Opera Medium-Back Director Chair IC-341-MB",
            description: "Medium-back version of the Opera Director Chair offering excellent mobility and comfort.",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749454891/steelmade/chairs/director-series/opera/ic-341-mb.jpg",
            specifications: {
              "Height": "42 inches",
              "Weight Capacity": "300 lbs",
              "Frame": "Premium grade aluminum"
            }
          }
        ]
      },"tycoon-director-chair": {
        id: "tycoon-director-chair",
        name: "Tycoon Director Chair",
        description: "The Tycoon Director Chair combines premium materials with ergonomic design for superior comfort and durability.",
        category: "chairs",
        seriesId: "director-series",
        inStock: true,
        imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg",
        images: [
          { 
            url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg",
            alt: "Tycoon High-Back Director Chair",
            width: 800,
            height: 1200
          },
          {
            url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749458141/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg",
            alt: "Tycoon Medium-Back Director Chair",
            width: 800,
            height: 1200
          }
        ],
        features: [
          "Premium build quality",
          "Ergonomic design",
          "Multiple back height options",
          "Reinforced frame structure"
        ],
        specifications: {
          "Material": "High-grade aluminum and premium upholstery",
          "Warranty": "5-year limited warranty",
          "Weight Capacity": "300 lbs",
          "Assembly": "Minimal assembly required"
        },
        variants: [
          {
            variantId: "ic-01-hb",
            variantName: "High Back",
            name: "Tycoon High-Back Director Chair IC-01-HB",
            description: "Premium high-back version of the Tycoon Director Chair for maximum comfort and support.",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg",
            specifications: {
              "Back Height": "High Back",
              "Model": "IC-01-HB",
              "Weight": "12 kg",
              "Dimensions": "28\"W x 30\"D x 48\"H"
            }
          },
          {
            variantId: "ic-02-mb",
            variantName: "Medium Back",
            name: "Tycoon Medium-Back Director Chair IC-02-MB",
            description: "Versatile medium-back version of the Tycoon Director Chair offering balanced comfort and mobility.",
            imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1749458141/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg",
            specifications: {
              "Back Height": "Medium Back",
              "Model": "IC-02-MB",
              "Weight": "11 kg",
              "Dimensions": "28\"W x 30\"D x 44\"H"
            }
          }
        ]
      }
    }
    // Add more series as needed
  }
  // Add more categories as needed
};

// Mock data for series
const mockSeries: Record<string, Record<string, ProductSeries>> = {
  chairs: {
    "director-series": {
      id: "director-series",
      title: "Director Series",
      description: "Premium director chairs for executives and film directors",
      category: "chairs",
      features: [
        "Premium design for executives",
        "High-quality materials",
        "Ergonomic comfort",
        "Adjustable features",
        "Professional appearance"
      ],
      products: mockData.chairs["director-series"]  // This links to all products including woodland-director-chair
    }
    // Add more series as needed
  }
  // Add more categories as needed
};

/**
 * Get product data by ID
 */
export function getProductById(category: string, seriesId: string, productId: string): ExtendedProductData | undefined {
  const product = mockData[category]?.[seriesId]?.[productId];
  
  if (!product) {
    console.error(`Product not found: ${category}/${seriesId}/${productId}`);
    console.log('Available products:', Object.keys(mockData[category]?.[seriesId] || {}));
  }
  
  return product;
}

/**
 * Get series data by ID
 */
export function getSeriesById(category: string, seriesId: string): ProductSeries | undefined {
  return mockSeries[category]?.[seriesId];
}

/**
 * Get all products in a category
 */
export function getAllProducts(category: string): Record<string, ExtendedProductData> {
  const products: Record<string, ExtendedProductData> = {};
  
  // Combine products from all series in the category
  Object.values(mockData[category] || {}).forEach(seriesProducts => {
    Object.values(seriesProducts).forEach(product => {
      products[product.id] = product;
    });
  });
  
  return products;
}

/**
 * Get all series in a category
 */
export function getAllSeries(category: string): Record<string, ProductSeries> {
  return mockSeries[category] || {};
}