'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { THEMES } from '../../lib/styles/category-themes';
import { HOMEPAGE_THEME } from '../../lib/styles/homepage-theme';
import { fadeInUp, staggerChildren, scaleOnHover } from '../../lib/styles/animations';
import { Armchair, LampDesk, Archive, Box, GraduationCap, HeartPulse } from 'lucide-react';

interface SanityCategory {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface CategoryCardProps {
  category: SanityCategory;
  index: number;
}

function getCategoryIcon(id: string) {
  switch (id) {
    case 'chairs': return <Armchair size={40} strokeWidth={1.5} />;
    case 'desks': return <LampDesk size={40} strokeWidth={1.5} />;
    case 'storage-solutions': return <Archive size={40} strokeWidth={1.5} />;
    case 'modular-furniture': return <Box size={40} strokeWidth={1.5} />;
    case 'school-furniture': return <GraduationCap size={40} strokeWidth={1.5} />;
    case 'hospital-furniture': return <HeartPulse size={40} strokeWidth={1.5} />;
    default: return <Box size={40} strokeWidth={1.5} />;
  }
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const theme = THEMES[category.id] || THEMES.chairs;
  
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover="hover"
      initial="rest"
    >
      <Link href={`/${category.id}`} className="block h-full">
        <motion.div
          variants={scaleOnHover}
          className="relative h-64 rounded-sm overflow-hidden border border-border/50 bg-card hover:shadow-minimal-hover transition-all duration-300 group"
        >
          {/* Background Gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-black/5"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}22, ${theme.accent}22)`
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            {/* Icon */}
            <div className="mb-4 opacity-80" style={{ color: theme.primary }}>
              {getCategoryIcon(category.id)}
            </div>
            
            {/* Text Content */}
            <div>
              <h3 
                className="text-xl font-serif tracking-wide mb-2 group-hover:text-primary/80 transition-colors"
                style={{ color: HOMEPAGE_THEME.text.primary }}
              >
                {category.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: HOMEPAGE_THEME.text.secondary }}
              >
                {category.description}
              </p>
            </div>
            
            {/* Hover Arrow */}
            <motion.div
              initial={{ x: 0, opacity: 0 }}
              whileHover={{ x: 5, opacity: 1 }}
              className="absolute bottom-6 right-6"
              style={{ color: theme.accent }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function CategoriesGrid({ initialCategories }: { initialCategories?: SanityCategory[] }) {
  // Use passed categories or fallback to empty array if not provided yet.
  const categories = initialCategories || [];

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: HOMEPAGE_THEME.background.secondary }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: HOMEPAGE_THEME.text.primary }}
          >
            Our Product Categories
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: HOMEPAGE_THEME.text.secondary }}
          >
            Discover our comprehensive range of professional furniture solutions,
            each designed to meet the unique needs of your workspace.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16 pt-8"
        >
          <p 
            className="text-lg mb-6"
            style={{ color: HOMEPAGE_THEME.text.muted }}
          >
            Need something specific? We offer custom solutions too.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:shadow-lg"
            style={{
              color: HOMEPAGE_THEME.accent.primary,
              borderColor: HOMEPAGE_THEME.accent.primary,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = HOMEPAGE_THEME.accent.primary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = HOMEPAGE_THEME.accent.primary;
            }}
          >
            Get Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
