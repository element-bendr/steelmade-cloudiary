import { client } from '../lib/sanity/client';

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

    const products = await client.fetch(query);
    
    console.log('\n=== SANITY PRODUCTS AUDIT ===\n');
    console.log(`Total products: ${products.length}`);
    
    const byCategory: Record<string, any> = {};
    const missingImages: any[] = [];
    
    (products as any[]).forEach(p => {
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

    console.log('\n=== VISITOR CHAIRS DETAILED ===\n');
    const visitorChairs = (products as any[]).filter(p => p.series?.toLowerCase() === 'visitor');
    console.log(`Found ${visitorChairs.length} visitor chairs:`);
    visitorChairs.forEach(p => {
      const status = p.mainImageUrl ? '✅' : '❌';
      console.log(`  ${status} ${p.name}`);
    });

    if (missingImages.length > 0) {
      console.log(`\n⚠️ MISSING MAIN IMAGES: ${missingImages.length}`);
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
