import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from 'next-sanity';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function auditProducts() {
  try {
    const query = `*[_type == "product"] | order(category asc, series asc, name asc) {
      _id,
      name,
      "id": slug.current,
      category,
      series,
      "mainImageUrl": mainImage.asset->url,
      "variants": variants[]{
        id,
        name,
        "imageUrl": image.asset->url
      }
    }`;

    const products: any[] = await client.fetch(query);
    
    console.log('\n=== SANITY PRODUCTS AUDIT ===\n');
    console.log(`✅ Connected to Sanity`);
    console.log(`📦 Total products: ${products.length}`);
    
    const byCategory: Record<string, any> = {};
    const missingImages: any[] = [];
    
    products.forEach(p => {
      const cat = p.category || 'uncategorized';
      if (!byCategory[cat]) {
        byCategory[cat] = { count: 0, series: {} };
      }
      byCategory[cat].count++;
      
      const ser = p.series || 'general';
      if (!byCategory[cat].series[ser]) {
        byCategory[cat].series[ser] = [];
      }
      byCategory[cat].series[ser].push(p);
      
      if (!p.mainImageUrl) {
        missingImages.push({ name: p.name, category: cat, series: ser });
      }
    });

    Object.entries(byCategory).forEach(([cat, data]: [string, any]) => {
      console.log(`\n📁 ${cat.toUpperCase()} (${data.count} products)`);
      Object.entries(data.series).forEach(([ser, prods]: [string, any]) => {
        const missing = prods.filter((p: any) => !p.mainImageUrl).length;
        const status = missing === 0 ? '✅' : `⚠️ (${missing} missing)`;
        console.log(`  ${status} ${ser}: ${prods.length} products`);
      });
    });

    console.log('\n=== VISITOR CHAIRS ===\n');
    const visitorChairs = products.filter(p => p.series?.toLowerCase() === 'visitor');
    console.log(`Found ${visitorChairs.length} visitor chairs:`);
    visitorChairs.forEach(p => {
      const status = p.mainImageUrl ? '✅' : '❌';
      console.log(`  ${status} ${p.name}`);
    });

    if (missingImages.length > 0) {
      console.log(`\n⚠️  MISSING MAIN IMAGES: ${missingImages.length}`);
      missingImages.forEach(m => {
        console.log(`  - ${m.name} (${m.series})`);
      });
    } else {
      console.log('\n✅ All products have main images');
    }

  } catch (error) {
    console.error('Error:', (error as Error).message);
    process.exit(1);
  }
}

auditProducts();
