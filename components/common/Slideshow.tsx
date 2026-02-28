'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

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
  showPlayPause?: boolean; // Kept for API compatibility but unused in minimal UI
  height?: string;
  className?: string;
}

const Slide: React.FC<{ slide: SlideData; isActive: boolean; isFirst: boolean }> = ({ slide, isActive, isFirst }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-background">
      {/* Cinematic Ken Burns Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: isActive ? 1 : 1.1, 
          opacity: isActive ? 1 : 0 
        }}
        transition={{ 
          scale: { duration: 6, ease: "easeOut" },
          opacity: { duration: 1.2 }
        }}
      >
        <Image 
          src={slide.backgroundImage} 
          alt={slide.title}
          fill
          priority={isFirst}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Edge-to-Edge Minimal Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      
      {/* Architectural Typography Grid */}
      <div className="relative h-full flex items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
                  }
                }}
                className="space-y-6"
              >
                {/* Accent Subtitle */}
                {slide.subtitle && (
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="flex items-center space-x-4"
                  >
                    <div className="h-px w-8 bg-red-600" />
                    <p className="text-sm font-sans text-red-500 font-medium tracking-widest uppercase">
                      {slide.subtitle}
                    </p>
                  </motion.div>
                )}
                
                {/* Main Heading */}
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-[1.1] font-medium tracking-tight"
                >
                  {slide.title}
                </motion.h1>
                
                {/* Description */}
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed font-light"
                >
                  {slide.description}
                </motion.p>
                
                {/* Sharp Minimal CTA */}
                {slide.ctaText && slide.ctaLink && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="pt-4"
                  >
                    <Link href={slide.ctaLink} passHref>
                      <Button variant="default" size="lg" className="rounded-[2px] bg-red-700 hover:bg-red-800 text-white border-red-700 tracking-wide h-12 px-8 uppercase text-xs">
                        {slide.ctaText}
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  autoPlay = true,
  interval = 6000, // Slightly longer interval to appreciate the cinematic slow-zoom
  showNavigation = true,
  showIndicators = true,
  height = '100vh',
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Standard Autoplay Interval
  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, nextSlide, interval, slides.length]);

  // Touch handlers for mobile
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  if (!slides || slides.length === 0) return null;

  return (
    <section 
      className={cn("relative w-full overflow-hidden bg-background", className)}
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Image Layer */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 z-0",
            index === currentSlide ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          <Slide slide={slide} isActive={index === currentSlide} isFirst={index === 0} />
        </div>
      ))}

      {/* Floating Side Nav Controls */}
      {showNavigation && slides.length > 1 && (
        <div className="absolute inset-0 z-10 flex items-center justify-between px-4 md:px-8 pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-12 h-12 bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-black/50 rounded-[2px]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 font-light" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-12 h-12 bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-black/50 rounded-[2px]"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 font-light" />
          </button>
        </div>
      )}

      {/* Minimalist Progress Trackers (Replaces Dots) */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute z-20 bottom-8 md:bottom-12 left-6 md:left-16 lg:left-24 flex items-center space-x-6">
          <div className="text-white/80 font-mono text-sm tracking-widest font-medium">
            0{currentSlide + 1} <span className="opacity-40">/ 0{slides.length}</span>
          </div>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative h-[2px] overflow-hidden bg-white/20 transition-all cursor-pointer"
                style={{ width: index === currentSlide ? '48px' : '24px' }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* The Filling Bar Timer */}
                {index === currentSlide && !isPaused && autoPlay && (
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: interval / 1000,
                      ease: "linear"
                    }}
                    key={currentSlide}
                  />
                )}
                {/* Instant filled state for active paused bar */}
                {index === currentSlide && (isPaused || !autoPlay) && (
                  <div className="absolute inset-y-0 left-0 w-full bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Slideshow;
