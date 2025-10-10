import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductVariant {
  id: string;
  variantId: string;
  variantName: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
}

interface GlassmorphicProductCardProps {
  product: Product;
  categorySlug: string;
  seriesSlug: string;
}

export const GlassmorphicProductCard: FC<GlassmorphicProductCardProps> = ({
  product,
  categorySlug,
  seriesSlug,
}) => {
  const productUrl = `/${categorySlug}/${seriesSlug}/${product.slug}`;
  const mainImage = product.images?.[0] || '';
  
  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300"
      whileHover={{ 
        scale: 1.03, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href={productUrl} className="block h-full">
        <div className="relative h-64 w-full overflow-hidden">          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              width={400}
              height={300}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          
          {/* Red accent decorative element */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/80 to-red-700/80 transform rotate-45 translate-x-10 -translate-y-10 z-0"></div>
        </div>
        
        <div className="p-5 relative z-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          {product.variants && product.variants.length > 0 && (
            <div className="mt-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Available Variants:</p>
              <div className="flex flex-wrap gap-2">                {product.variants.slice(0, 3).map((variant) => (
                  <span key={variant.id} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                    {variant.variantName}
                  </span>
                ))}
                {product.variants.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                    +{product.variants.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <span className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800">
              View Details
              <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GlassmorphicProductCard;