import { MetadataRoute } from "next";
import {
  getAllSeries,
  getLastModified,
  ProductType,
} from "@/lib/services/product-service";

const BASE_URL = "https://steelmade.com";

/**
 * Generates a sitemap for the website with proper priorities and change frequencies
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Define static pages
  const staticPages = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  // Product category pages
  const productTypes: ProductType[] = ["chairs", "desks", "storage-solutions"];
  const productPages = productTypes.map((type) => ({
    url: `${BASE_URL}/${type}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Get all product series for each category
  const seriesPages: MetadataRoute.Sitemap = [];
  
  for (const type of productTypes) {
    const seriesData = await getAllSeries(type);
    
    for (const [seriesId, series] of Object.entries(seriesData)) {
      const lastModified = await getLastModified(type, seriesId);
      
      seriesPages.push({
        url: `${BASE_URL}/${type}/${seriesId}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...productPages, ...seriesPages];
}
