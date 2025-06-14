import { notFound } from "next/navigation";
import { ProtectedCollectionsGrid } from "@/components/collections/protected-collections-grid";
import { SubCategoryCollection } from "@/types/collections";
import { collections } from "@/lib/data/collections-data";
import type { ImageAsset } from "@/types/image-types"; // Added import for ImageAsset

interface PageProps {
  params: {
    seriesId: string;
  };
}

export default function Page({ params }: PageProps) {
  const collection = collections.chairs?.[params.seriesId];

  if (!collection) {
    notFound();
  }

  // Convert each product to a collection, using Object.keys to get accurate count
  const products = collection.products || {};
  const productIds = Object.keys(products);

  const productCollections = productIds.reduce<Record<string, SubCategoryCollection>>((acc, productId) => {
    const product = products[productId];
    const fallbackCoverImage: ImageAsset = {
      url: "/images/collections/placeholder-collection.webp",
      alt: `Placeholder image for ${product.name}`,
      width: 800,
      height: 800
    };
    // Ensure product.images are correctly typed as ImageAsset[] if they come from ProductData
    const productImagesAsAssets: ImageAsset[] = product.images?.map(img => ({ 
      url: img.url, 
      alt: img.alt, 
      width: img.width, 
      height: img.height 
    })) || [];

    acc[productId] = {
      id: productId,
      metadata: {
        title: product.name,
        description: product.description || "",
        seoDescription: product.description || "", // Fallback to description
        coverImage: productImagesAsAssets[0] || fallbackCoverImage,
        features: product.features || [],
        images: productImagesAsAssets.length > 0 ? productImagesAsAssets : [fallbackCoverImage],
        lastModified: new Date().toISOString(), // Fallback to current date as ProductData lacks lastModified
      },
      features: product.features || [],
      // materials: product.materials || [], // ProductData lacks materials
      products: {},
      lastModified: new Date().toISOString(), // Fallback to current date
    };
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{collection.title}</h1>
        <p className="text-muted-foreground mt-2">{collection.description}</p>
      </div>

      <ProtectedCollectionsGrid
        type="chairs"
        collections={productCollections}
      />
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
