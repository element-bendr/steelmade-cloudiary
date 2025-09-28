'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOMEPAGE_THEME } from '../../lib/styles/homepage-theme';
import { fadeInUp, slideInFromLeft, slideInFromRight, staggerChildren } from '../../lib/styles/animations';

const HERITAGE_STATS = [
  {
    number: '75+',
    label: 'Years of Excellence',
    description: 'Serving clients since 1948'
  },
  {
    number: '10,000+',
    label: 'Happy Customers',
    description: 'Trusted by businesses worldwide'
  },
  {
    number: '50,000+',
    label: 'Products Delivered',
    description: 'Quality furniture solutions'
  },
  {
    number: '100%',
    label: 'Quality Guarantee',
    description: 'Commitment to excellence'
  }
];

const CRAFTSMANSHIP_FEATURES = [
  {
    icon: '🔨',
    title: 'Master Craftsmanship',
    description: 'Every piece is meticulously crafted by skilled artisans with decades of experience.'
  },
  {
    icon: '🌟',
    title: 'Premium Materials',
    description: 'We source only the finest materials to ensure durability and comfort in every product.'
  },
  {
    icon: '⚡',
    title: 'Innovation Focus',
    description: 'Combining traditional craftsmanship with modern design and ergonomic principles.'
  },
  {
    icon: '✅',
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control ensure every product meets our high standards.'
  }
];

function StatCard({ stat, index }: { stat: typeof HERITAGE_STATS[0]; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="text-center"
    >
      <div 
        className="text-4xl lg:text-5xl font-bold mb-2"
        style={{ color: HOMEPAGE_THEME.accent.primary }}
      >
        {stat.number}
      </div>
      <div 
        className="text-lg font-semibold mb-1"
        style={{ color: HOMEPAGE_THEME.text.primary }}
      >
        {stat.label}
      </div>
      <div 
        className="text-sm"
        style={{ color: HOMEPAGE_THEME.text.muted }}
      >
        {stat.description}
      </div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof CRAFTSMANSHIP_FEATURES[0]; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="flex items-start space-x-4 p-6 rounded-lg"
      style={{ backgroundColor: HOMEPAGE_THEME.background.primary }}
    >
      <div className="text-3xl flex-shrink-0 opacity-80">
        {feature.icon}
      </div>
      <div>
        <h4 
          className="text-lg font-semibold mb-2"
          style={{ color: HOMEPAGE_THEME.text.primary }}
        >
          {feature.title}
        </h4>
        <p 
          className="leading-relaxed"
          style={{ color: HOMEPAGE_THEME.text.secondary }}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function CraftsmanshipSection() {
  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: HOMEPAGE_THEME.background.primary }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heritage Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Text Content */}
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4">
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: HOMEPAGE_THEME.accent.light,
                  color: HOMEPAGE_THEME.accent.primary 
                }}
              >
                Since 1948
              </span>
            </div>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: HOMEPAGE_THEME.text.primary }}
            >
              A Legacy of 
              <span style={{ color: HOMEPAGE_THEME.accent.primary }}>
                {' '}Excellence
              </span>
            </h2>
            
            <div className="space-y-4 text-lg leading-relaxed" style={{ color: HOMEPAGE_THEME.text.secondary }}>
              <p>
                For over seven decades, SteelMade has been at the forefront of furniture innovation, 
                combining traditional craftsmanship with modern design principles to create 
                exceptional workplace solutions.
              </p>
              <p>
                From our humble beginnings in 1948, we have grown to become a trusted partner 
                for businesses worldwide, never compromising on quality or design excellence.
              </p>
            </div>
            
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 group"
                style={{
                  color: HOMEPAGE_THEME.accent.primary,
                  borderColor: HOMEPAGE_THEME.accent.primary,
                  border: '2px solid'
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
                Learn Our Story
                <svg 
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Heritage Image Placeholder */}
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div 
              className="aspect-square rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: HOMEPAGE_THEME.background.accent }}
            >
              {/* Placeholder for heritage image */}
              <div className="w-full h-full flex items-center justify-center">
                <div 
                  className="text-center p-8"
                  style={{ color: HOMEPAGE_THEME.text.muted }}
                >
                  <div className="text-6xl mb-4">🏭</div>
                  <p className="text-lg">Heritage Craftsmanship</p>
                  <p className="text-sm">Since 1948</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div 
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: HOMEPAGE_THEME.accent.primary }}
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 py-16 border-t border-b border-opacity-20"
          style={{ borderColor: HOMEPAGE_THEME.border }}
        >
          {HERITAGE_STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Craftsmanship Features */}
        <div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h3 
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ color: HOMEPAGE_THEME.text.primary }}
            >
              Why Choose SteelMade
            </h3>
            <p 
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: HOMEPAGE_THEME.text.secondary }}
            >
              Our commitment to excellence goes beyond just creating furniture. 
              We craft experiences that enhance productivity and comfort.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {CRAFTSMANSHIP_FEATURES.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}