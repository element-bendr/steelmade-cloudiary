#!/usr/bin/env node
import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

interface Product {
  _id: string;
  name: string;
  slug: string;
  series: string;
  category: string;
  publicId: string;
  description: string;
  features: string[];
  specifications: any[];
}

// Extract base name and variant type from product name
function extractVariant(name: string): { baseName: string; variant: string | null } {
  const patterns = [
    { regex: /^(.+?)\s+(High Back|Mid Back|Low Back|HB|MB|LB)$/i, group: 2 },
    { regex: /^(.+?)\s+(with arms|w\/o arms|without arms|with pad|with cushion)$/i, group: 2 },
    { regex: /^(.+?)\s+(visitor|castor|visi|writing pad)$/i, group: 2 },
    { regex: /^(.+?)\s+\((.+?)\)$/i, group: 2 }, // Extract from parentheses
  ];

  for (const pattern of patterns) {
    const match = name.match(pattern.regex);
    if (match) {
      return {
        baseName: match[1].trim(),
        variant: match[pattern.group].trim(),
      };
    }
  }

  return { baseName: name, variant: null };
}

async function analyzeVariantConsolidation() {
  console.log('\n🔍 ANALYZING PRODUCTS FOR VARIANT CONSOLIDATION\n');

  // Get all products
  const products: Product[] = await sanityClient.fetch(`
    *[_type == "product"] | order(category asc, series asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      category,
      series,
      "publicId": mainImage.publicId,
      description,
      features,
      specifications
    }
  `);

  console.log(`📦 Total products: ${products.length}\n`);

  // Group by category and series
  const bySeries = new Map<string, Product[]>();
  products.forEach(p => {
    const key = `${p.category}/${p.series}`;
    const existing = bySeries.get(key) || [];
    existing.push(p);
    bySeries.set(key, existing);
  });

  console.log('📊 ANALYZING VARIANT PATTERNS:\n');

  const consolidationPlan: any[] = [];
  let totalVariants = 0;
  let totalConsolidated = 0;

  bySeries.forEach((seriesProducts, seriesKey) => {
    // Group by base name
    const byBaseName = new Map<string, Product[]>();
    
    seriesProducts.forEach(p => {
      const { baseName, variant } = extractVariant(p.name);
      const key = baseName.toLowerCase();
      const existing = byBaseName.get(key) || [];
      existing.push({ ...p, extractedVariant: variant });
      byBaseName.set(key, existing);
    });

    // Find groups with multiple products (potential variants)
    byBaseName.forEach((prods, baseName) => {
      if (prods.length > 1) {
        const hasVariants = prods.some((p: any) => p.extractedVariant !== null);
        
        if (hasVariants) {
          console.log(`\n📌 ${baseName.toUpperCase()} (${seriesKey})`);
          console.log(`   ${prods.length} products:`);
          
          const variants = prods.map((p: any) => ({
            name: p.name,
            variant: p.extractedVariant || 'standard',
            slug: p.slug,
            id: p._id,
            image: p.publicId,
          }));

          variants.forEach(v => {
            console.log(`   - ${v.name} → ${v.variant}`);
          });

          consolidationPlan.push({
            baseName: prods[0].name.split(/\s+(High|Mid|Low|With|W\/o|Visitor|Castor)/i)[0].trim(),
            series: seriesKey,
            category: prods[0].category,
            productCount: prods.length,
            products: variants,
            suggestedSlug: baseName.toLowerCase().replace(/\s+/g, '-'),
            primaryProduct: variants[0],
            variantsToAdd: variants,
          });

          totalVariants += prods.length;
          totalConsolidated += 1;
        }
      }
    });
  });

  console.log('\n\n📊 CONSOLIDATION SUMMARY:\n');
  console.log(`  Products with variants: ${totalVariants}`);
  console.log(`  Can be consolidated into: ${totalConsolidated} base products`);
  console.log(`  Space saved: ${totalVariants - totalConsolidated} fewer SKUs\n`);

  // Group by series for better reporting
  const bySeriesReport = new Map<string, any[]>();
  consolidationPlan.forEach(item => {
    const existing = bySeriesReport.get(item.series) || [];
    existing.push(item);
    bySeriesReport.set(item.series, existing);
  });

  console.log('📋 BREAKDOWN BY SERIES:\n');
  Array.from(bySeriesReport.entries()).sort((a, b) => b[1].length - a[1].length).forEach(([series, items]) => {
    console.log(`  ${series}: ${items.length} products to consolidate (${items.reduce((sum, i) => sum + i.productCount, 0)} → ${items.length})`);
  });

  fs.writeFileSync(
    'variant-consolidation-plan.json',
    JSON.stringify({
      summary: {
        totalProducts: products.length,
        productsWithVariants: totalVariants,
        consolidatedProducts: totalConsolidated,
        spaceSaved: totalVariants - totalConsolidated,
      },
      consolidationPlan,
      bySeries: Object.fromEntries(bySeriesReport),
    }, null, 2)
  );

  console.log('\n💾 Saved detailed plan: variant-consolidation-plan.json\n');

  console.log('📝 EXAMPLES OF CONSOLIDATION:\n');
  consolidationPlan.slice(0, 5).forEach(item => {
    console.log(`  ${item.baseName}:`);
    console.log(`    Before: ${item.productCount} separate products`);
    console.log(`    After: 1 product with ${item.variantsToAdd.length} variants`);
    item.variantsToAdd.forEach((v: any) => {
      console.log(`      - ${v.variant}`);
    });
    console.log();
  });

  console.log('💡 NEXT STEPS:');
  console.log('  1. Review variant-consolidation-plan.json');
  console.log('  2. Run consolidation script with --execute flag');
  console.log('  3. Verify products on website show variant selector\n');
}

analyzeVariantConsolidation().catch(console.error);
