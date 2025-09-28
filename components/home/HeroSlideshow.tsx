'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { HOMEPAGE_THEME } from '../../lib/styles/homepage-theme';
import { fadeInUp, slideInFromRight, slideInFromLeft } from '../../lib/styles/animations';
import ScrollIndicator from './ScrollIndicator';

// Slideshow content data
const SLIDES = [
  {
    id: 1,
    title: 'Crafted for Excellence',
    subtitle: 'Since 1948',
    description: 'Premium furniture solutions designed for comfort, built for durability, and trusted by industry leaders across the globe.',
    primaryCTA: {
      text: 'Explore Collection',
      href: '/chairs'
    },
    secondaryCTA: {
      text: 'Our Heritage',
      href: '/about'
    },
    backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
    theme: 'dark'
  },
  {
    id: 2,
    title: 'Director Series',
    subtitle: 'Leadership Redefined',
    description: 'Executive chairs that embody authority and comfort. Each piece is a statement of presence and refined taste.',
    primaryCTA: {
      text: 'View Director Series',
      href: '/chairs/director-series'
    },
    secondaryCTA: {
      text: 'All Chairs',
      href: '/chairs'
    },
    backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-360-hb.jpg',
    theme: 'dark'
  },
  {
    id: 3,
    title: 'Executive Excellence',
    subtitle: 'Where Innovation Meets Comfort',
    description: 'The Executive Series embodies the art of leadership—each chair a throne of innovation, comfort, and prestige.',
    primaryCTA: {
      text: 'Executive Series',
      href: '/chairs/executive-series'
    },
    secondaryCTA: {
      text: 'Custom Solutions',
      href: '/contact'
    },
    backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
    theme: 'dark'
  },
  {
    id: 4,
    title: 'Ergonomic Innovation',
    subtitle: 'Science Meets Comfort',
    description: 'Designed for wellness, these chairs support your posture and productivity with precision engineering.',
    primaryCTA: {
      text: 'Ergonomic Series',
      href: '/chairs/ergonomic-series'
    },
    secondaryCTA: {
      text: 'Learn More',
      href: '/faq'
    },
    backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png',
    theme: 'light'
  }
];

interface SlideProps {
  slide: typeof SLIDES[0];
  isActive: boolean;
}

function Slide({ slide, isActive }: SlideProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
        style={{ 
          backgroundImage: `url(${slide.backgroundImage})`,
          transform: isActive ? 'scale(1)' : 'scale(1.1)'
        }}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: slide.theme === 'dark' 
              ? 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-4"
                >
                  <span 
                    className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: HOMEPAGE_THEME.accent.light,
                      color: HOMEPAGE_THEME.accent.primary 
                    }}
                  >
                    {slide.subtitle}
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
                  style={{ 
                    color: slide.theme === 'dark' ? '#FFFFFF' : HOMEPAGE_THEME.text.primary,
                    lineHeight: '1.1',
                    letterSpacing: '-0.025em'
                  }}
                >
                  {slide.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl"
                  style={{ 
                    color: slide.theme === 'dark' ? 'rgba(255,255,255,0.9)' : HOMEPAGE_THEME.text.secondary
                  }}
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {/* Primary CTA */}
                  <Link
                    href={slide.primaryCTA.href}
                    className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{ 
                      backgroundColor: HOMEPAGE_THEME.accent.primary,
                      minWidth: '200px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = HOMEPAGE_THEME.accent.hover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = HOMEPAGE_THEME.accent.primary;
                    }}
                  >
                    {slide.primaryCTA.text}
                  </Link>

                  {/* Secondary CTA */}
                  <Link
                    href={slide.secondaryCTA.href}
                    className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 hover:shadow-lg transform hover:scale-105"
                    style={{ 
                      color: slide.theme === 'dark' ? '#FFFFFF' : HOMEPAGE_THEME.text.primary,
                      borderColor: slide.theme === 'dark' ? 'rgba(255,255,255,0.3)' : HOMEPAGE_THEME.border,
                      backgroundColor: 'transparent',
                      minWidth: '200px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = slide.theme === 'dark' 
                        ? 'rgba(255,255,255,0.1)' 
                        : HOMEPAGE_THEME.background.secondary;
                      e.currentTarget.style.borderColor = slide.theme === 'dark' 
                        ? '#FFFFFF' 
                        : HOMEPAGE_THEME.accent.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = slide.theme === 'dark' 
                        ? 'rgba(255,255,255,0.3)' 
                        : HOMEPAGE_THEME.border;
                    }}
                  >
                    {slide.secondaryCTA.text}
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 5000); // Change slide every 5 seconds
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Slide slide={slide} isActive={index === currentSlide} />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4 sm:p-8 pointer-events-none">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center text-white transition-opacity duration-300 hover:bg-opacity-40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center text-white transition-opacity duration-300 hover:bg-opacity-40"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center text-white transition-opacity duration-300 hover:bg-opacity-40"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-opacity duration-300 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-65'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
        <motion.div
          className="h-full bg-white bg-opacity-70"
          initial={{ width: '0%' }}
          animate={{ width: isPlaying && !isPaused ? '100%' : '0%' }}
          transition={{ 
            duration: 5, 
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }}
          key={currentSlide}
        />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}