'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOMEPAGE_THEME } from '../../lib/styles/homepage-theme';
import { fadeInUp, staggerChildren, buttonHover } from '../../lib/styles/animations';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: HOMEPAGE_THEME.background.primary }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
            style={{ 
              color: HOMEPAGE_THEME.text.primary,
              lineHeight: '1.1',
              letterSpacing: '-0.025em'
            }}
          >
            Crafted for Excellence
            <br />
            <span style={{ color: HOMEPAGE_THEME.accent.primary }}>
              Since 1948
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ color: HOMEPAGE_THEME.text.secondary }}
          >
            Premium furniture solutions designed for comfort, built for durability, 
            and trusted by industry leaders across the globe.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.div
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/chairs"
                className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg"
                style={{ 
                  backgroundColor: HOMEPAGE_THEME.accent.primary,
                  minWidth: '200px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = HOMEPAGE_THEME.accent.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = HOMEPAGE_THEME.accent.primary;
                }}
              >
                Explore Our Collection
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/about"
                className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2"
                style={{ 
                  color: HOMEPAGE_THEME.text.primary,
                  borderColor: HOMEPAGE_THEME.border,
                  backgroundColor: 'transparent',
                  minWidth: '200px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = HOMEPAGE_THEME.background.secondary;
                  e.currentTarget.style.borderColor = HOMEPAGE_THEME.accent.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = HOMEPAGE_THEME.border;
                }}
              >
                Our Heritage Story
              </Link>
            </motion.div>
          </motion.div>

          {/* Heritage Badge */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 pt-8 border-t border-opacity-20"
            style={{ borderColor: HOMEPAGE_THEME.border }}
          >
            <p 
              className="text-sm font-medium tracking-wide uppercase"
              style={{ color: HOMEPAGE_THEME.text.muted }}
            >
              Trusted by Industry Leaders
            </p>
            <div className="flex justify-center items-center mt-4 space-x-8 opacity-60">
              {/* Placeholder for company logos */}
              <div className="h-8 w-24 bg-gray-200 rounded opacity-40"></div>
              <div className="h-8 w-24 bg-gray-200 rounded opacity-40"></div>
              <div className="h-8 w-24 bg-gray-200 rounded opacity-40"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 rounded-full p-1" style={{ borderColor: HOMEPAGE_THEME.text.muted }}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 rounded-full mx-auto"
            style={{ backgroundColor: HOMEPAGE_THEME.text.muted }}
          />
        </div>
      </motion.div>
    </section>
  );
}