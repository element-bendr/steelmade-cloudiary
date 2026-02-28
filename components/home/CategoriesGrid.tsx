'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { THEMES } from '../../lib/styles/category-themes';
import { HOMEPAGE_THEME } from '../../lib/styles/homepage-theme';
import { fadeInUp, staggerChildren, scaleOnHover } from '../../lib/styles/animations';

// Product categories configuration
const PRODUCT_CATEGORIES = [
  {
    id: 'chairs',
    title: 'Office Chairs',
    description: 'Ergonomic and executive seating solutions',
    href: '/chairs',
    icon: '🪑'
  },
  {
    id: 'desks',
    title: 'Office Desks',
    description: 'Professional workstations and desks',
    href: '/desks',
    icon: '🪑'
  },
  {
    id: 'storage',
    title: 'Storage Solutions',
    description: 'Filing cabinets and storage systems',
    href: '/storage-solutions',
    icon: '🗃️'
  },
  {
    id: 'modular-furniture',
    title: 'Modular Systems',
    description: 'Flexible modular furniture solutions',
    href: '/modular-furniture',
    icon: '🏢'
  },
  {
    id: 'school-furniture',
    title: 'Educational',
    description: 'School and educational furniture',
    href: '/school-furniture',
    icon: '🎓'
  },
  {
    id: 'hospital-furniture',
    title: 'Healthcare',
    description: 'Medical and hospital furniture',
    href: '/hospital-furniture',
    icon: '🏥'
  }
];

interface CategoryCardProps {
  category: typeof PRODUCT_CATEGORIES[0];
  index: number;
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
      <Link href={category.href} className="block h-full">
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
            <div className="text-4xl mb-4 opacity-80">
              {category.icon}
            </div>
            
            {/* Text Content */}
            <div>
              <h3 
                className="text-xl font-serif tracking-wide mb-2 group-hover:text-primary/80 transition-colors"
              >
                {category.title}
              </h3>
              <p 
                className="text-sm leading-relaxed text-muted-foreground"
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

export default function CategoriesGrid() {
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
          {PRODUCT_CATEGORIES.map((category, index) => (
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