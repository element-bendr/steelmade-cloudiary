/**
 * Card component types
 */

/**
 * Base props for card components
 */
export interface CardProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Card title */
  title?: string;
  /** Card description or content */
  description?: string;
  /** Image source URL or path */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Link URL if card is clickable */
  href?: string;
  /** Card variant style */
  variant?: 'default' | 'featured' | 'compact' | 'outline';
  /** Optional ID for the card */
  id?: string;
  /** Optional test ID for testing */
  testId?: string;
}