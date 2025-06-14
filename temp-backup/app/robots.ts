import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Common files and directories we want to disallow
      disallow: [
        '/admin/',     // Admin pages
        '/_next/',     // Next.js system files
        '/api/',       // API endpoints
        '/private/',   // Any private content
        '*.json',      // JSON data files
        '*.xml',       // XML files except sitemap
        '/uploads/'    // User uploaded content
      ]
    },
    sitemap: 'https://steelmade.com/sitemap.xml',
    host: 'https://steelmade.com'
  }
}
