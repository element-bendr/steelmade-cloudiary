import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewTycoonChairSection() {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Introducing the Tycoon Director Chair</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Elevate your professional space with our new Tycoon Director Chair, designed for those who demand exceptional comfort and uncompromising quality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-lg h-[500px] hover:scale-[1.01] transition-transform duration-300">
            <Image
              src="https://res.cloudinary.com/dqde19mfs/image/upload/v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg"
              alt="Tycoon Director Chair"
              fill
              priority
              // set a reasonable quality to reduce bytes while keeping visual fidelity
              quality={75}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
              NEW
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Tycoon Director Chair</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Premium Build Quality</h4>
                  <p className="text-gray-600">Crafted with high-grade aluminum and premium upholstery for lasting durability</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Ergonomic Design</h4>
                  <p className="text-gray-600">Engineered for comfort during long hours with proper lumbar support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Multiple Variants</h4>
                  <p className="text-gray-600">Available in high-back and medium-back configurations to suit your preferences</p>
                </div>
              </div>
            </div>
            
            <div className="space-x-4">
              <Link 
                href="/chairs/director-series/tycoon-director-chair"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 inline-block"
                aria-label="View details — Tycoon Director Chair (New)"
              >
                View Details
              </Link>
              <Link 
                href="/chairs/director-series"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md font-medium transition duration-300 inline-block"
              >
                Explore Series
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}