'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { cn } from '../../lib/utils';

// Types for slide data
export interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: 'light' | 'dark' | 'gradient';
}

export interface SlideshowProps {
  slides: SlideData[];
  autoPlay?: boolean;
  interval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showPlayPause?: boolean;
  height?: string;
  className?: string;
}

// Individual slide component
interface SlideProps {
  slide: SlideData;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ slide, isActive }) => {
  const overlayClass = {
    light: 'bg-black bg-opacity-20',
    dark: 'bg-black bg-opacity-60',
    gradient: 'bg-gradient-to-b from-black/30 via-black/40 to-black/70'
  };

  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${slide.backgroundImage})` }}
    >
      <div className={cn(
        'absolute inset-0',
        overlayClass[slide.overlay || 'dark']
      )} />
      
      <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {slide.subtitle && (
              <motion.p 
                className="text-sm sm:text-base text-red-400 font-medium tracking-wide uppercase"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {slide.subtitle}
              </motion.p>
            )}
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {slide.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {slide.description}
            </motion.p>
            
            {slide.ctaText && slide.ctaLink && (
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <a
                  href={slide.ctaLink}
                  className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  {slide.ctaText}
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Main Slideshow component
export const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
  showNavigation = true,
  showIndicators = true,
  showPlayPause = true,
  height = '60vh',
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || isPaused || slides.length <= 1) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [isPlaying, isPaused, nextSlide, interval, slides.length]);

  // Touch handlers for swipe support
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
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

  if (!slides || slides.length === 0) {
    return <div className="w-full bg-gray-200 flex items-center justify-center" style={{ height }}>
      <p className="text-gray-500">No slides available</p>
    </div>;
  }

  return (
    <section 
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Slide slide={slide} isActive={index === currentSlide} />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showNavigation && slides.length > 1 && (
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
      )}

      {/* Bottom Controls */}
      {(showPlayPause || showIndicators) && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          {/* Play/Pause Button */}
          {showPlayPause && slides.length > 1 && (
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center text-white transition-opacity duration-300 hover:bg-opacity-40"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          {/* Slide Indicators */}
          {showIndicators && slides.length > 1 && (
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-opacity duration-300",
                    index === currentSlide
                      ? 'bg-white'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-65'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {isPlaying && !isPaused && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
          <motion.div
            className="h-full bg-white bg-opacity-70"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: interval / 1000,
              ease: 'linear',
              repeat: Infinity,
            }}
            key={currentSlide}
          />
        </div>
      )}
    </section>
  );
};

export default Slideshow;