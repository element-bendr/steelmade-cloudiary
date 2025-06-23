import { ProductService } from '@/modules/product/services/product-service';
import { Product } from '@/modules/product/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = params;

  // Modular: fetch by ID, then check series/category
  const product = await ProductService.getProductById(productId);
  if (!product || product.seriesSlug !== 'director-series' || product.categorySlug !== 'chairs') {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {product.images && product.images.length > 0 ? (
            <div className="relative w-full h-96">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          ) : (
            <div className="relative w-full h-96">
              <Image
                src="/images/placeholder/product-fallback.jpg"
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc pl-5">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="mb-1">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Specifications</h2>
              <dl>
                {Object.entries(product.specifications).map(([key, value]: [string, unknown]) => (
                  <div key={key} className="grid grid-cols-2 py-2 border-b">
                    <dt className="font-medium">{key}</dt>
                    <dd>{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Available Variants</h2>
              <div className="space-y-4">
                {product.variants.map((variant: any) => (
                  <div key={variant.variantId} className="p-4 border rounded">
                    <h3 className="font-medium">{variant.variantName}</h3>
                    <p className="text-sm text-gray-600">{variant.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Button */}
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition mt-4">
            Contact Us About This Product
          </button>
        </div>
      </div>
    </div>
  );
}