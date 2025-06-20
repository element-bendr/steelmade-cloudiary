import React from 'react';
import { Testimonials } from './components/testimonials';
import { GradientButton } from '../components/ui/gradient-button';
import Link from 'next/link';
import { Metadata } from 'next';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewTycoonChairSection from '@/components/home/NewTycoonChairSection';
import FeaturedProduct from '@/components/home/FeaturedProduct';

export const metadata: Metadata = {
  title: 'SteelMade Furniture - Premium Furniture Solutions',
  description: 'Discover SteelMade\'s premium furniture collection, including our exclusive Tycoon Director Chair, crafted with quality materials and designed for comfort.',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto py-24 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Furniture Solutions for Every Space</h1>
            <p className="text-lg mb-8">Crafted with quality materials and designed for comfort</p>
            
            <div className="space-x-4">
              <Link 
                href="/chairs" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
              >
                Explore Chairs
              </Link>
              <Link 
                href="/chairs/director-series/tycoon-director-chair" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition duration-300"
              >
                New: Tycoon Chair
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <NewTycoonChairSection />
      
      <div className="py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">SteelMade Furniture</h1>
        <p className="text-xl text-gray-600 text-center mb-8">Premium chairs and furniture for your office and home</p>
        
        {/* Featured Product Section */}
        <FeaturedProduct />
        
        {/* Rest of homepage content */}
      </div>
      
      <Testimonials />
    </main>
  );
}
