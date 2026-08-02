'use client'; // This component is a client component and should be used in a client context  
import React from 'react';
import { usePathname } from 'next/navigation';

interface CanonicalProps {
  /**
   * Custom path to use instead of the current path
   * Useful for alternate versions of pages (e.g., paginated content)
   */
  path?: string;
  
  /**
   * Domain to use for the canonical URL
   * If not provided, will use the BASE_URL constant
   */
  domain?: string;
}

const BASE_URL = 'https://steelmade.com';

/**
 * Canonical URL component for consistent SEO
 * Adds a canonical link to the page based on the current path
 * Can be overridden with custom path and domain
 * 
 * Usage:
 * <CanonicalUrl /> - Uses current path
 * <CanonicalUrl path="/products" /> - Uses custom path
 */
export function CanonicalUrl({ path, domain = BASE_URL }: CanonicalProps) {
  const pathname = usePathname();
  const canonicalPath = path || pathname;

  // Ensure canonicalPath is not null before calling replace
  const normalizedPath = canonicalPath === '/' 
    ? canonicalPath 
    : canonicalPath ? canonicalPath.replace(/\/$/, '') : ''; // Added null check
  
  const canonicalUrl = `${domain}${normalizedPath}`;
  
  return <link rel="canonical" href={canonicalUrl} />;
}

/**
 * Component for paginated content that adds rel="prev" and rel="next" links
 * Important for SEO of paginated content
 * 
 * Usage:
 * <PaginationSeo 
 *   currentPage={2} 
 *   totalPages={5} 
 *   basePath="/blog"
 *   queryParam="page"
 * />
 */
interface PaginationSeoProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParam?: string;
  domain?: string;
}

export function PaginationSeo({
  currentPage,
  totalPages,
  basePath,
  queryParam = 'page',
  domain = BASE_URL,
}: PaginationSeoProps) {
  // Build the URL for a specific page
  const getPageUrl = (pageNum: number) => {
    if (pageNum === 1) {
      return `${domain}${basePath}`;
    }
    return `${domain}${basePath}?${queryParam}=${pageNum}`;
  };

  // Current canonical URL
  const canonicalUrl = getPageUrl(currentPage);
  
  // Previous and next page URLs
  const prevUrl = currentPage > 1 ? getPageUrl(currentPage - 1) : null;
  const nextUrl = currentPage < totalPages ? getPageUrl(currentPage + 1) : null;
  
  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}
    </>
  );
}