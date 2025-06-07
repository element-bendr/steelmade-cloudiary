import { NextRequest, NextResponse } from 'next/server';

// A simple utility to generate Link headers for HTTP/2 Server Push
export function generateLinkHeader(assets: { url: string; as: string; crossorigin?: boolean }[]) {
  return assets
    .map(({ url, as, crossorigin }) => {
      let link = `<${url}>; rel=preload; as=${as}`;
      if (crossorigin) link += '; crossorigin';
      return link;
    })
    .join(', ');
}

// Example critical assets to push
const criticalAssets = [
  { url: '/_next/static/css/app.css', as: 'style' },
  { url: '/_next/static/chunks/main.js', as: 'script' },
  { url: '/fonts/inter-var.woff2', as: 'font', crossorigin: true },
];

export function addHttp2ServerPush(request: NextRequest, response: NextResponse) {
  // Only add Link headers on HTML responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('text/html')) {
    // Add Link header for HTTP/2 Server Push
    response.headers.set('Link', generateLinkHeader(criticalAssets));
  }
  
  return response;
}
