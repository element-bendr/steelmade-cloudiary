import { Metadata } from "next";

export interface ProductCategoryMetadataConfig {
  category: string;
  title?: string;
  description?: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  keywords?: string[];
}

export function generateProductCategoryMetadata({
  category,
  title,
  description,
  image,
  keywords = [],
}: ProductCategoryMetadataConfig): Metadata {
  const defaultTitle = `${category} | Steelmade Office Furniture`;
  const defaultDescription = `Explore our premium range of ${category.toLowerCase()} designed for modern workspaces. High-quality office furniture solutions by Steelmade.`;
  const defaultImage = {
    url: "/images/products/placeholder-product.webp",
    width: 800,
    height: 600,
    alt: `Steelmade ${category}`
  };

  const finalImage = image || defaultImage;
  const finalKeywords = [
    category,
    `office ${category.toLowerCase()}`,
    "office furniture",
    "premium furniture",
    "modern workspace",
    "Steelmade furniture",
    ...keywords
  ];

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: finalKeywords,
    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      type: "website",
      images: [
        {
          url: finalImage.url,
          width: finalImage.width,
          height: finalImage.height,
          alt: finalImage.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [finalImage.url]
    }
  };
}
