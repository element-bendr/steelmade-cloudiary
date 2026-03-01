import React from 'react';
import { Metadata } from 'next';
import { 
  CategoriesGrid, 
  CraftsmanshipSection, 
  TestimonialsSection,
  FeaturedProduct
} from '../components/home';
import { Slideshow } from '../components/common';
import { generateHomepageSlides } from '../lib/slideshow/slide-generator';
import ScrollIndicator from '../components/home/ScrollIndicator';
import { SanityProductService } from '@/lib/services/sanity-product-service';

export const metadata: Metadata = {
  title: 'SteelMade Furniture - Crafted for Excellence Since 1948',
  description: 'Premium furniture solutions designed for comfort, built for durability, and trusted by industry leaders. Discover our comprehensive range of office chairs, desks, and workspace furniture.',
  keywords: 'office furniture, executive chairs, office desks, premium furniture, workspace solutions, ergonomic chairs',
  openGraph: {
    title: 'SteelMade Furniture - Crafted for Excellence Since 1948',
    description: 'Premium furniture solutions designed for comfort, built for durability, and trusted by industry leaders.',
    type: 'website',
  }
};

export default async function HomePage() {
  const homepageSlides = generateHomepageSlides();
  const categories = await SanityProductService.getAllCategories();

  return (
    <main className="min-h-screen">
      {/* Hero Slideshow - Dynamic introduction showcasing featured products and company story */}
      <div className="relative">
        <Slideshow 
          slides={homepageSlides}
          height="100vh"
          autoPlay={true}
          interval={5000}
          showNavigation={true}
          showIndicators={true}
          showPlayPause={true}
        />
        <ScrollIndicator />
      </div>
      
      {/* Categories Grid - Showcase our product range using existing theme system */}
      <CategoriesGrid initialCategories={categories} />

      {/* Featured Products / Trending Series */}
      <FeaturedProduct />
      
      {/* Heritage & Craftsmanship - Tell our story and build trust */}
      <CraftsmanshipSection />
      
      {/* Testimonials - Social proof from satisfied customers */}
      <TestimonialsSection />
    </main>
  );
}
