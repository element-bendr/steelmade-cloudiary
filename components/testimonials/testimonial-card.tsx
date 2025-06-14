"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Testimonial } from "./types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-card/50 backdrop-blur-sm", className)}>
      <CardContent className="p-6">
        {/* Quote Icon */}
        <svg
          className="h-8 w-8 text-red-500/20 absolute top-6 right-6"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>

        {/* Feedback */}
        <p className="text-muted-foreground relative mb-6">
          {testimonial.feedback}
        </p>

        {/* Author Info */}
        <div className="flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-red-500/20">
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="48px"
              priority
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              {testimonial.name}
            </p>
            {(testimonial.role || testimonial.company) && (
              <p className="text-xs text-muted-foreground mt-1">
                {testimonial.role}
                {testimonial.role && testimonial.company && " • "}
                {testimonial.company}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
