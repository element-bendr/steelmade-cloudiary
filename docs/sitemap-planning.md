# Sitemap Planning

## Routes to Include

### Static Pages
- / (Home)
- /about
- /contact
- /portfolio
- /faq

### Product Category Pages
- /chairs
- /desks
- /storage

### Dynamic Product Pages (Generated from Series Data)
- /chairs/[seriesId]
- /desks/[seriesId]
- /storage/[seriesId]

## Implementation Plan

1. **Setup**
   - Create `app/sitemap.ts` using Next.js built-in support
   - Ensure proper caching and revalidation strategy

2. **Required Functions**
   ```typescript
   // Need to implement these in product-service.ts
   getAllSeries(type: ProductType): Promise<Record<string, SeriesMetadata>>
   getLastModified(type: ProductType, seriesId: string): Promise<Date>
   ```

3. **Sitemap Structure**
   ```typescript
   interface SitemapEntry {
     url: string
     lastModified: Date
     changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
     priority: number
   }
   ```

4. **Priority Levels**
   - Home (1.0)
   - Product Category Pages (0.8)
   - Individual Product Pages (0.7)
   - About/Contact/Portfolio (0.6)
   - FAQ (0.5)

5. **Change Frequencies**
   - Home: weekly
   - Product Pages: monthly
   - Static Pages: yearly

## Next Steps

1. Implement `sitemap.ts` using Next.js 13 metadata API
2. Add last modified date tracking to product data
3. Configure cache revalidation
4. Implement robots.txt with sitemap reference
5. Test sitemap validity using Google Search Console tools

## Additional Considerations

1. **robots.txt Configuration**
   ```txt
   User-agent: *
   Allow: /
   
   Sitemap: https://steelmade.com/sitemap.xml
   ```

2. **Images in Sitemap**
   - Include product images with proper alt text
   - Consider separate image sitemap for large catalogs

3. **Performance Impact**
   - Cache sitemap generation
   - Use ISR for dynamic routes
   - Implement proper error handling

4. **Monitoring**
   - Track sitemap crawl rates
   - Monitor coverage in Search Console
   - Set up alerts for crawl errors
