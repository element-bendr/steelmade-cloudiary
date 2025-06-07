import { ProductCategory } from "@/types/collections";
import { Product } from "@/types/products";
import { ProductCategorySchema } from "@/components/seo/product-category-schema";
import { ProductCategoryCanonicalUrl } from "@/components/seo/product-category-canonical-url";
import { Metadata } from "next";
import { generateProductCategoryMetadata } from "@/lib/utils/generateProductCategoryMetadata";

interface ProductCategoryLayoutProps {
  children: React.ReactNode;
  params: {
    category: string;
    subcategory?: string;
  };
  products?: Product[];
  metadata?: {
    title?: string;
    description?: string;
    image?: {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
    keywords?: string[];
  };
}

export async function generateMetadata(
  { params, metadata = {} }: ProductCategoryLayoutProps
): Promise<Metadata> {
  return generateProductCategoryMetadata({
    category: params.category,
    ...metadata
  });
}

export default function ProductCategoryLayout({ 
  children,
  params,
  products = [],
  metadata = {}
}: ProductCategoryLayoutProps) {
  const { category, subcategory } = params;
  
  return (
    <>
      <ProductCategorySchema 
        category={category}
        description={metadata.description}
        products={products}
      />
      <ProductCategoryCanonicalUrl 
        category={category}
        subcategory={subcategory}
      />
      {children}
    </>
  );
}
