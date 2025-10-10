import { NextResponse } from 'next/server';
import { getSeriesById, getSeriesProducts } from '../../../../lib/services/product-service';

export async function GET() {
  try {
    // Test visitor series
    const visitorSeries = await getSeriesById("chairs", "visitor-series");
    const visitorProducts = await getSeriesProducts("chairs", "visitor-series");
    
    // Test executive series
    const executiveSeries = await getSeriesById("chairs", "executive-series");
    const executiveProducts = await getSeriesProducts("chairs", "executive-series");
    
    // Test director series
    const directorSeries = await getSeriesById("chairs", "director-series");
    const directorProducts = await getSeriesProducts("chairs", "director-series");
    
    return NextResponse.json({
      visitor: {
        series: visitorSeries,
        products: visitorProducts ? Object.keys(visitorProducts) : [],
        productCount: visitorProducts ? Object.keys(visitorProducts).length : 0
      },
      executive: {
        series: executiveSeries,
        products: executiveProducts ? Object.keys(executiveProducts) : [],
        productCount: executiveProducts ? Object.keys(executiveProducts).length : 0
      },
      director: {
        series: directorSeries,
        products: directorProducts ? Object.keys(directorProducts) : [],
        productCount: directorProducts ? Object.keys(directorProducts).length : 0
      }
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}