import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Chair } from '@/lib/factories/chairFactory';

interface ChairCardProps {
  chair: Chair;
  basePath?: string;
}

/**
 * Poetic, glassmorphic card for director chairs, using brand colors and modular button
 */
export function ChairCard({ chair, basePath = '/chairs/director-series' }: ChairCardProps) {
  return (
    <Link href={`${basePath}/${chair.id}`} className="group">
      <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform group-hover:scale-[1.03] group-hover:shadow-2xl">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={chair.imageUrl}
            alt={chair.name}
            width={400}
            height={400}
            className="object-contain w-full h-full max-w-full max-h-full"
            style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
          />
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent-light opacity-20 rounded-bl-2xl"></div>
        </div>
        <div className="p-5 flex flex-col gap-2">
          <h3 className="text-xl font-bold text-accent-dark group-hover:text-primary transition-colors">
            {chair.name}
          </h3>
          <p className="text-sm text-muted">
            {chair.description.length > 60
              ? `${chair.description.substring(0, 60)}...`
              : chair.description}
          </p>
          <button
            className="mt-3 px-4 py-2 rounded-lg bg-accent-light text-white font-semibold shadow-md hover:bg-accent-dark transition-colors backdrop-blur-sm border border-accent-light/30"
            type="button"
            tabIndex={-1}
            aria-label={`View details for ${chair.name}`}
            style={{ pointerEvents: 'none' }}
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}