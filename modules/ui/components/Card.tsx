'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

/**
 * Card component
 * A versatile card component for displaying content in a contained format
 */
export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'medium'
}: CardProps) {
  // Base styles
  const baseStyles = 'rounded-lg overflow-hidden';
  
  // Variant styles
  const variantStyles = {
    default: 'bg-white',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md'
  };
  
  // Padding styles
  const paddingStyles = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6'
  };
  
  // Combined styles
  const cardStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${className}
  `;
  
  return (
    <div className={cardStyles}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardHeader component
 * A header section for the Card component
 */
export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardTitle component
 * A title for the Card component
 */
export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardContent component
 * The main content area for the Card component
 */
export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardFooter component
 * A footer section for the Card component
 */
export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 flex items-center ${className}`}>
      {children}
    </div>
  );
}