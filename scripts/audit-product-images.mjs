import { client } from '../lib/sanity/client.js';

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
    
    const byCategory = {};
    const missingImages = [];
    
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
      
      // Track missing images
      if (!p.mainImageUrl) {
        missingImages.push({ name: p.name, category: cat, series: ser });
      }
    });

    // Print by category
    Object.entries(byCategory).forEach(([cat, data]) => {
      console.log(`\n📁 ${cat.toUpperCase()} (${data.count} products)`);
      Object.entries(data.series).forEach(([ser, prods]) => {
        const missing = prods.filter(p => !p.mainImageUrl).length;
        const status = missing === 0 ? '✅' : `⚠️  (${missing} missing)`;
        console.log(`  ${status} ${ser}: ${prods.length} products`);
      });
    });

    // Special check for visitor
    console.log('\n=== VISITOR CHAIRS DETAILED ===\n');
    const visitorChairs = products.filter(p => p.series?.toLowerCase() === 'visitor');
    console.log(`Found ${visitorChairs.length} visitor chairs:`);
    visitorChairs.forEach(p => {
      const status = p.mainImageUrl ? '✅' : '❌';
      console.log(`  ${status} ${p.name}`);
    });

    // Report missing images
    if (missingImages.length > 0) {
      console.log(`\n⚠️  MISSING MAIN IMAGES: ${missingImages.length}`);
      missingImages.forEach(m => {
        console.log(`  - ${m.name} (${m.series})`);
      });
    } else {
      console.log('\n✅ All products have main images');
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

auditProducts();
