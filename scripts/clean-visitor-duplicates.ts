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
  token: process.env.SANITY_API_TOKEN,
});

interface Product {
  _id: string;
  name: string;
  slug: string;
  series: string;
  publicId: string;
  _createdAt: string;
}

async function cleanDuplicates() {
  const EXECUTE = process.argv.includes('--execute');
  console.log(`\n🧹 CLEANING VISITOR SERIES DUPLICATES (${EXECUTE ? 'EXECUTE' : 'DRY RUN'})\n`);

  // Get all visitor series products
  const products: Product[] = await sanityClient.fetch(`
    *[_type == "product" && category == "chairs" && lower(series) match "*visitor*"] | order(name asc, _createdAt asc) {
      _id,
      name,
      "slug": slug.current,
      series,
      "publicId": mainImage.publicId,
      _createdAt
    }
  `);

  console.log(`📊 Found ${products.length} visitor series products\n`);

  // Group by publicId
  const byPublicId = new Map<string, Product[]>();
  products.forEach(p => {
    if (p.publicId) {
      const existing = byPublicId.get(p.publicId) || [];
      existing.push(p);
      byPublicId.set(p.publicId, existing);
    }
  });

  // Find duplicates
  const duplicates = Array.from(byPublicId.entries()).filter(([_, prods]) => prods.length > 1);

  console.log('🔍 DUPLICATES FOUND:\n');

  const toDelete: string[] = [];
  const toKeep: string[] = [];
  const decisions: any[] = [];

  duplicates.forEach(([publicId, prods]) => {
    const shortId = publicId.split('/').pop();
    console.log(`Image: ${shortId} (${prods.length} products)`);

    // Special handling for ic-93-lb (used by 7 products incorrectly)
    if (shortId === 'ic-93-lb') {
      console.log('  ⚠️  This image is incorrectly shared by multiple products');
      console.log('  📝 Need manual review - each product should have its own image\n');
      
      prods.forEach(p => {
        console.log(`    - ${p.name} (${p.slug}) - ${p._createdAt}`);
      });
      console.log('\n  💡 DECISION: Keep all for manual review\n');
      
      decisions.push({
        image: shortId,
        issue: 'incorrectly_shared',
        action: 'manual_review_needed',
        products: prods.map(p => ({ id: p._id, name: p.name, slug: p.slug })),
      });
      return;
    }

    // For other duplicates, keep the oldest (first created)
    const sorted = [...prods].sort((a, b) => 
      new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
    );

    const keep = sorted[0];
    const remove = sorted.slice(1);

    console.log(`  ✅ KEEP: ${keep.name} (${keep.slug}) - created ${keep._createdAt}`);
    toKeep.push(keep._id);

    remove.forEach(p => {
      console.log(`  ❌ DELETE: ${p.name} (${p.slug}) - created ${p._createdAt}`);
      toDelete.push(p._id);
    });

    decisions.push({
      image: shortId,
      keep: { id: keep._id, name: keep.name, slug: keep.slug },
      delete: remove.map(p => ({ id: p._id, name: p.name, slug: p.slug })),
    });

    console.log();
  });

  console.log('\n📊 SUMMARY:');
  console.log(`  Total products: ${products.length}`);
  console.log(`  To keep: ${products.length - toDelete.length}`);
  console.log(`  To delete: ${toDelete.length}`);
  console.log(`  For manual review: 7 (ic-93-lb issue)\n`);

  // Save decisions
  fs.writeFileSync(
    'visitor-duplicates-cleanup-plan.json',
    JSON.stringify({ decisions, toDelete, execute: EXECUTE }, null, 2)
  );
  console.log('💾 Saved: visitor-duplicates-cleanup-plan.json\n');

  if (EXECUTE && toDelete.length > 0) {
    console.log('🗑️  DELETING DUPLICATE PRODUCTS:\n');
    
    let deleted = 0;
    let failed = 0;

    for (const id of toDelete) {
      const product = products.find(p => p._id === id);
      try {
        await sanityClient.delete(id);
        console.log(`  ✅ [${deleted + 1}/${toDelete.length}] Deleted: ${product?.name} (${product?.slug})`);
        deleted++;
      } catch (error) {
        console.error(`  ❌ Failed: ${product?.name} - ${error}`);
        failed++;
      }
    }

    console.log(`\n✨ CLEANUP COMPLETE:`);
    console.log(`  Deleted: ${deleted}/${toDelete.length}`);
    console.log(`  Failed: ${failed}`);
    console.log(`  Remaining products: ${products.length - deleted}\n`);

    console.log('⚠️  MANUAL ACTION REQUIRED:');
    console.log('  7 products share the ic-93-lb image incorrectly');
    console.log('  Each needs to be assigned the correct image from Cloudinary\n');

  } else if (!EXECUTE) {
    console.log('💡 Run with --execute to delete duplicate products\n');
  }
}

cleanDuplicates().catch(console.error);
