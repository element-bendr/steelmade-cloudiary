'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HOMEPAGE_THEME } from '../../lib/styles/homepage-theme';
import { fadeInUp, staggerChildren } from '../../lib/styles/animations';

const TESTIMONIALS = [
  {
    id: 1,
    content: "SteelMade has been our go-to furniture partner for over 15 years. Their attention to detail and commitment to quality is unmatched in the industry.",
    author: "Sarah Johnson",
    position: "Operations Director",
    company: "TechCorp Solutions",
    rating: 5
  },
  {
    id: 2,
    content: "The Tycoon Director Chair has transformed our executive boardroom. The comfort and professional appearance have impressed all our clients.",
    author: "Michael Chen",
    position: "CEO",
    company: "Global Innovations Inc.",
    rating: 5
  },
  {
    id: 3,
    content: "Outstanding customer service and exceptional quality. Our office renovation was completed on time and exceeded all expectations.",
    author: "Emma Rodriguez",
    position: "Facility Manager",
    company: "Metro Healthcare",
    rating: 5
  },
  {
    id: 4,
    content: "The modular furniture system has given us the flexibility we needed as our company grows. Highly recommend SteelMade to any business.",
    author: "David Thompson",
    position: "Head of Operations",
    company: "StartupHub",
    rating: 5
  }
];

interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS[0];
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="p-8 rounded-xl shadow-lg h-full flex flex-col"
      style={{
        backgroundColor: HOMEPAGE_THEME.background.primary,
        border: `1px solid ${HOMEPAGE_THEME.border}`
      }}
    >
      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5"
            style={{ color: HOMEPAGE_THEME.accent.primary }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-grow mb-6">
        <p 
          className="text-lg leading-relaxed italic"
          style={{ color: HOMEPAGE_THEME.text.secondary }}
        >
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center space-x-4">
        {/* Avatar Placeholder */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: HOMEPAGE_THEME.accent.primary }}
        >
          {testimonial.author.split(' ').map(name => name[0]).join('')}
        </div>
        
        <div>
          <div 
            className="font-semibold"
            style={{ color: HOMEPAGE_THEME.text.primary }}
          >
            {testimonial.author}
          </div>
          <div 
            className="text-sm"
            style={{ color: HOMEPAGE_THEME.text.muted }}
          >
            {testimonial.position}
          </div>
          <div 
            className="text-sm font-medium"
            style={{ color: HOMEPAGE_THEME.accent.primary }}
          >
            {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
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
            What Our Clients Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: HOMEPAGE_THEME.text.secondary }}
          >
            Don&apos;t just take our word for it. Here&apos;s what industry leaders 
            have to say about their experience with SteelMade.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-opacity-20"
          style={{ borderColor: HOMEPAGE_THEME.border }}
        >
          <p 
            className="text-lg mb-8"
            style={{ color: HOMEPAGE_THEME.text.muted }}
          >
            Trusted by over 10,000 businesses worldwide
          </p>
          
          {/* Trust Badges */}
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {/* Placeholder for trust badges/certifications */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-xs font-medium" style={{ color: HOMEPAGE_THEME.text.muted }}>
                Award Winner
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div className="text-xs font-medium" style={{ color: HOMEPAGE_THEME.text.muted }}>
                ISO Certified
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <div className="text-xs font-medium" style={{ color: HOMEPAGE_THEME.text.muted }}>
                5-Star Rated
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}