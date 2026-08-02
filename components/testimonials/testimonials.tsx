"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "./testimonial-card";
import { testimonials as defaultTestimonials } from "@/lib/data/testimonials-data";
import { TestimonialProps } from "./types";

export function Testimonials({ className, testimonials = defaultTestimonials }: TestimonialProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn("p-8", className)}>
      <header className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
        >
          Client Testimonials
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-2 text-lg"
        >
          Hear what our clients have to say about us
        </motion.p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {testimonials.map((testimonial) => (
          <motion.div 
            key={testimonial.id} 
            variants={item}
            className="flex"
          >
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Testimonials;
