import React from 'react';
import Image from 'next/image';
import { ProductData, ProductVariant } from '@/types/products';

interface ProductDetailPageProps {
  product: ProductData;
  series?: any;
  category?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, series, category }) => {
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 p-4 rounded-md">
          <h2 className="text-xl text-red-700">Product Not Found</h2>
          <p className="text-red-600">The product you are looking for could not be found.</p>
        </div>
      </div>
    );
  }

  // Hide price for executive series
  const hidePrice = series?.id === 'executive-series' || category === 'executive-series';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 py-12">
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Glassmorphic Image Section */}
          <div className="relative rounded-3xl shadow-xl bg-white/40 backdrop-blur-lg border border-red-200 overflow-hidden flex flex-col items-center justify-center">
            {product.imageUrl ? (
              <div className="relative w-full h-96 flex items-center justify-center">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain rounded-2xl drop-shadow-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-red-100/30 pointer-events-none" />
              </div>
            ) : (
              <div className="h-96 w-full bg-gray-200 flex items-center justify-center rounded-2xl">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          {/* Glassmorphic Details Section */}
          <div className="rounded-3xl shadow-xl bg-white/60 backdrop-blur-lg border border-red-200 p-8 flex flex-col justify-between min-h-[28rem]">
            <div>
              <h1 className="text-4xl font-extrabold text-red-700 mb-2 tracking-tight drop-shadow-sm">
                {product.name}
              </h1>
              <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                {product.description}
              </p>

              {/* Price (hidden for executive series) */}
              {!hidePrice && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-red-700 mb-1">Price</h2>
                  <p className="text-2xl font-bold text-gray-900 bg-red-100/60 px-3 py-1 rounded-xl inline-block shadow-sm">
                    ${product.price}
                  </p>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-red-700 mb-2">Features</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-800">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="ml-1">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-red-700 mb-2">Specifications</h2>
                  <div className="border border-red-100 rounded-xl overflow-hidden bg-white/70">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div
                        key={index}
                        className={`flex py-2 px-4 ${index % 2 === 0 ? 'bg-red-50/40' : 'bg-white/0'}`}
                      >
                        <span className="font-medium w-1/3 text-gray-700">{key}</span>
                        <span className="w-2/3 text-gray-600">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-red-700 mb-2">Available Variants</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.variants.map((variant: ProductVariant, index: number) => (
                      <div key={index} className="border border-red-100 rounded-xl p-3 bg-white/80 hover:shadow-lg transition flex flex-col items-center">
                        <h3 className="font-medium mb-1 text-gray-900">{variant.variantName}</h3>
                        <p className="text-sm text-gray-600 mb-2 italic">{variant.description}</p>
                        {variant.imageUrl && (
                          <div className="relative h-28 w-full rounded-lg overflow-hidden">
                            <Image
                              src={variant.imageUrl}
                              alt={variant.variantName}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="flex-1 bg-red-700 hover:bg-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-md transition-all">
                Add to Cart
              </button>
              <button className="flex-1 border border-red-300 hover:bg-red-50 py-3 px-6 rounded-xl font-semibold text-red-700 transition-all">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};