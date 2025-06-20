import { NextResponse } from 'next/server';
import { loadAllDirectorSeriesChairs } from '@/lib/data/products/chairs/director-series/auto-loader';

/**
 * API route for getting all director series chairs
 * This provides a way for client components to access the chair data
 */
export async function GET() {
  try {
    // Load all chairs using the auto-loader
    const chairs = await loadAllDirectorSeriesChairs();
    
    // Return as JSON
    return NextResponse.json(chairs);
  } catch (error) {
    console.error('Error in director-series API route:', error);
    return NextResponse.json(
      { error: 'Failed to load director series chairs' },
      { status: 500 }
    );
  }
}