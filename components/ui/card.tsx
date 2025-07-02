"use client"

import * as React from "react"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

type CardProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "enhanced-morphism rounded-lg",
      className
    )}
    whileHover={{ scale: 1.03, rotateX: 10, rotateY: 15 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight tracking-tight",
      "text-card-foreground",
      "mb-1",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      "mb-0",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription }