"use client"

import { cn } from "../../lib/utils"
import React from "react"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  asLink?: boolean
  href?: string
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, asLink, href, ...props }, ref) => {
    const baseStyle = "inline-block rounded px-6 py-3 text-gray-900 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-red-600/60 after:via-red-600 after:to-red-600/60 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:scale-y-150 hover:after:transform"

    if (asLink && href) {
      return (
        <a href={href} className={cn(baseStyle, className)}>
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyle, className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

GradientButton.displayName = "GradientButton"
