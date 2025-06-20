import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Chair } from '@/lib/factories/chairFactory';
import { ChairDetail } from './ChairDetail';

interface Breadcrumb {
  name: string;
  href: string;
}

interface ChairPageLayoutProps {
  chair: Chair;
  selectedVariant: string;
  onVariantChange: (variantId: string) => void;
  breadcrumbs: Breadcrumb[];
  children?: ReactNode;
}

/**
 * Standardized layout component for chair detail pages
 */
export function ChairPageLayout({
  chair,
  selectedVariant,
  onVariantChange,
  breadcrumbs,
  children
}: ChairPageLayoutProps) {
  return (
    <div className="container mx-auto py-10">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.href}>
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <li className="inline-flex items-center">
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-500">{breadcrumb.name}</span>
                  ) : (
                    <Link href={breadcrumb.href} className="text-gray-700 hover:text-red-600">
                      {breadcrumb.name}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>

      {/* Chair Details */}
      <ChairDetail 
        chair={chair} 
        selectedVariant={selectedVariant} 
        onVariantChange={onVariantChange} 
      />

      {/* Additional content */}
      {children}
    </div>
  );
}