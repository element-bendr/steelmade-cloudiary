'use client';

import type { ProductData } from '@/types/products';

interface ProductInformationProps {
  product: ProductData;
}

const ProductInformation: React.FC<ProductInformationProps> = ({ product }) => {
  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-800">{product.name}</h1>
      {product.price !== undefined ? (
        <p className="text-2xl text-blue-600 mb-5 font-semibold">
          ${product.price.toFixed(2)}
        </p>
      ) : (
        <p className="text-xl text-gray-700 mb-5 font-medium">
          Contact us for pricing
        </p>
      )}
      
      <div className="prose prose-lg max-w-none text-gray-700 mb-6">
        <p>{product.description}</p>
      </div>
      
      {product.features && product.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Features</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 bg-gray-50 p-4 rounded-md border border-gray-200">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-600">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <button 
        className={`w-full sm:w-auto px-8 py-3 rounded-md text-white font-semibold transition-colors duration-150 
                    bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      >
        Contact Us
      </button>
    </div>
  );
};

export default ProductInformation;
