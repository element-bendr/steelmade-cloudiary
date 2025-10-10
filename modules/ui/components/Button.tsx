'use client';

import React from 'react';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  ariaLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

/**
 * Button component
 * A reusable button component with various styles and sizes
 */
export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ariaLabel,
  icon,
  iconPosition = 'left',
  fullWidth = false
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    link: 'text-red-600 hover:text-red-800 underline focus:ring-red-500 p-0'
  };
  
  // Size styles
  const sizeStyles = {
    small: 'text-xs px-2.5 py-1.5',
    medium: 'text-sm px-4 py-2',
    large: 'text-base px-6 py-3'
  };
  
  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Disabled style
  const disabledStyle = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';
  
  // Combined styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${variant !== 'link' ? sizeStyles[size] : ''}
    ${widthStyle}
    ${disabledStyle}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {label}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}