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
      products: mockData.chairs["director-series"]
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