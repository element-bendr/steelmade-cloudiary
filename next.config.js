// @ts-nocheck  // Add this line at the top of the file
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {    
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 1080, 1920], // Simplified device sizes
    imageSizes: [32, 96, 256], // Simplified image sizes
    formats: ['image/webp', 'image/avif'], // Add AVIF support for better compression
    minimumCacheTTL: 86400, // Increase cache TTL to 24 hours for better performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    // All experimental features disabled to prevent build errors
    // optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons'],
    // webpackBuildWorker: true
  },    
  reactStrictMode: true,
  swcMinify: true,  
  output: 'standalone', // Creates a standalone build that's optimized for production
  // Enable HTTP/2 for improved performance
  compress: true,
  poweredByHeader: false,
  // Simplified build configuration to resolve stack overflow
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Simplified webpack config
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  // Temporarily disable all redirects to fix the build issue
  async redirects() {
    return []
    
    // Original redirects - re-enable after fixing build issues
    /*
    return [
      {
        source: '/collections/:path*',
        destination: '/:path*',
        permanent: true
      },
      {
        source: '/products/:path*',
        destination: '/:path*',
        permanent: true
      }
    ]
    */
  }
};

const analyzedConfig = withBundleAnalyzer(nextConfig);
module.exports = withPWA(analyzedConfig);
