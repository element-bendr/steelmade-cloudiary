"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExtendedProductData, ProductSeries } from "@/lib/utils/product-utils";

interface ProductDetailPageProps {
  product: ExtendedProductData;
  series: ProductSeries;
  category: string;
}

export default function ProductDetailPage({ 
  product, 
  series,
  category
}: ProductDetailPageProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 
      ? product.variants[0] 
      : null
  );
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Update selected image when variant changes
  useEffect(() => {
    if (selectedVariant) {
      setSelectedImage(selectedVariant.imageUrl);
    } else if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [selectedVariant, product.images]);

  // Function to find and select variant based on image URL
  const findAndSelectVariantByImage = (imageUrl: string) => {
    const variant = product.variants.find(v => v.imageUrl === imageUrl);
    if (variant) {
      setSelectedVariant(variant);
    }
    // If no variant matches this image, just show the image but don't change variant
    setSelectedImage(imageUrl);
  };
  
  // Handle contact button click
  const handleContactClick = () => {
    console.log("Contact button clicked for variant:", selectedVariant?.variantName);
    alert(`Contact form would open for ${selectedVariant?.variantName || product.name}`);
  };
  
  return (
    <div className="container py-16 max-w-7xl mx-auto">
      {/* Breadcrumb navigation */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-red-600 transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href={`/${category}`} className="hover:text-red-600 transition-colors">{category.charAt(0).toUpperCase() + category.slice(1)}</Link></li>
          <li>/</li>
          <li><Link href={`/${category}/${series.id}`} className="hover:text-red-600 transition-colors">{series.title}</Link></li>
          <li>/</li>
          <li className="text-red-600 font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Main content area with improved grid layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Product Images - Left column, wider on desktop */}
        <div className="xl:col-span-5 space-y-6">          
          {/* Main image display */}          <div className="relative rounded-lg border shadow-sm bg-white overflow-hidden" 
               style={{ maxHeight: '500px', height: '50vh' }}>
            <Image
              src={selectedImage || product.imageUrl}
              alt={selectedVariant?.name || product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-contain p-4"
              priority
            />
          </div>
            
          {/* Image thumbnails */}
          <div className="flex space-x-4 overflow-x-auto pb-2 justify-center">
            {product.variants && product.variants.length > 0 ? (
              product.variants.map((variant) => (
                <div 
                  key={variant.variantId}
                  onClick={() => setSelectedVariant(variant)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer 
                             transition-all hover:shadow-md hover:scale-105
                             ${selectedVariant?.variantId === variant.variantId ? 'border-2 border-red-600' : 'border border-gray-200'}`}
                >                  <Image
                    src={variant.imageUrl}
                    alt={variant.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs py-1 px-1 truncate text-center">
                    {variant.variantName}
                  </div>
                </div>
              ))
            ) : (
              product.images && product.images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => findAndSelectVariantByImage(image.url)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer 
                             transition-all hover:shadow-md hover:scale-105 
                             ${selectedImage === image.url ? 'border-2 border-red-600' : 'border border-gray-200'}`}
                >                  <Image
                    src={image.url}
                    alt={image.alt || `${product.name} image ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Product Details - Right column */}
        <div className="xl:col-span-7 space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">{product.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          
          {/* Product status */}
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="mx-2">•</span>
            <span className="text-sm text-muted-foreground">Series: {series.title}</span>
          </div>
          
          {/* Variants selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="border-t border-b py-6">
              <h2 className="text-xl font-semibold mb-4">Available Options</h2>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (                  
                  <button
                    key={variant.variantId}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedVariant?.variantId === variant.variantId 
                        ? 'bg-red-600 text-white shadow-md transform -translate-y-0.5' 
                        : 'bg-gray-100 hover:bg-red-50 text-gray-800 hover:text-red-700'
                    }`}
                  >
                    {variant.variantName}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 mr-3 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Contact button */}
          <div className="mt-8">
            <button
              onClick={handleContactClick}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-sm font-medium"
            >
              Contact About {selectedVariant ? selectedVariant.variantName : product.name}
            </button>
            {product.inStock && (
              <p className="text-sm text-muted-foreground mt-2">
                Contact us for pricing and availability details
              </p>
            )}          
          </div>
          
          {/* Specifications section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="bg-white/70 p-6 rounded-xl shadow-md border relative overflow-hidden h-full">
                  <h3 className="font-medium text-lg mb-3 pb-2 border-b border-gray-200/50 text-gray-800">
                    Base Product Specifications
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    These specifications represent our standard offering, which can be customized based on your requirements.
                  </p>
                  <dl className="grid grid-cols-1 gap-y-3 relative z-10">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-gray-200/30">
                        <dt className="font-medium text-gray-800">{key}</dt>
                        <dd className="text-gray-600">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              
              {/* Customizable message */}
              {selectedVariant && (
                <div className="bg-red-50/90 p-6 rounded-xl shadow-md border border-red-200/50 relative overflow-hidden h-full">
                  <h3 className="font-medium text-lg mb-3 text-red-800 relative z-10">
                    Customizable Specifications
                  </h3>
                  <p className="text-gray-700 relative z-10">
                    All our chair specifications can be customized based on your specific requirements. 
                    The {selectedVariant.variantName} can be modified in terms of dimensions, materials, 
                    and additional features to perfectly suit your project needs.
                  </p>
                  <div className="mt-6 relative z-10">
                    <button 
                      onClick={handleContactClick}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition-all hover:shadow-lg"
                    >
                      Request Custom Specifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products section */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
          <Link 
            href={`/${category}/${series.id}`} 
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.values(series.products)
            .filter(relatedProduct => relatedProduct.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <Link 
                key={relatedProduct.id} 
                href={`/${category}/${series.id}/${relatedProduct.id}`}
                className="group block bg-white/30 rounded-lg p-3 border border-gray-100/30 shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-white mb-3 border">                  <Image
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-base group-hover:text-red-600 transition-colors mb-1">{relatedProduct.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{relatedProduct.description}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}