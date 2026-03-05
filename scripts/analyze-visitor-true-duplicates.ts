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
  publicId: string;
  _createdAt: string;
  _updatedAt: string;
}

async function analyzeVisitorDuplicates() {
  console.log('\n📊 ANALYZING VISITOR SERIES PRODUCTS VS CLOUDINARY IMAGES\n');

  const products: Product[] = await sanityClient.fetch(`
    *[_type == "product" && category == "chairs" && lower(series) match "*visitor*"] | order(name asc, _createdAt asc) {
      _id,
      name,
      "slug": slug.current,
      series,
      "publicId": mainImage.publicId,
      _createdAt,
      _updatedAt
    }
  `);

  console.log(`📦 Total Products: ${products.length}\n`);

  // Cloudinary images (from previous search)
  const cloudinaryImages = 42; // 30 in visitor-series + 12 in other folders

  console.log(`☁️  Cloudinary Images: ${cloudinaryImages}`);
  console.log(`📦 Sanity Products: ${products.length}`);
  console.log(`➕ Difference: ${products.length - cloudinaryImages} extra products\n`);

  // Group by name
  const byName = new Map<string, Product[]>();
  products.forEach(p => {
    const key = p.name.toLowerCase().trim();
    const existing = byName.get(key) || [];
    existing.push(p);
    byName.set(key, existing);
  });

  console.log('🔍 DUPLICATE PRODUCTS BY NAME:\n');

  const trueDuplicates = Array.from(byName.entries()).filter(([_, prods]) => prods.length > 1);

  trueDuplicates.forEach(([name, prods]) => {
    console.log(`📝 ${name} (${prods.length} products)`);
    prods.forEach(p => {
      const idType = p._id.startsWith('imported-product') ? 'IMPORTED' : 'CREATED';
      const created = new Date(p._createdAt).toLocaleDateString();
      console.log(`  - [${idType}] ${p.slug}`);
      console.log(`    ID: ${p._id}`);
      console.log(`    Image: ${p.publicId?.split('/').pop() || 'NO IMAGE'}`);
      console.log(`    Created: ${created}\n`);
    });
  });

  console.log('\n📊 SUMMARY OF DUPLICATES:\n');
  
  let totalDuplicateProducts = 0;
  trueDuplicates.forEach(([_, prods]) => {
    totalDuplicateProducts += prods.length - 1; // -1 because we keep one
  });

  console.log(`  Duplicate groups: ${trueDuplicates.length}`);
  console.log(`  Extra products (can remove): ${totalDuplicateProducts}`);
  console.log(`  After cleanup: ${products.length - totalDuplicateProducts} products`);
  console.log(`  Cloudinary images: ${cloudinaryImages}`);
  console.log(`  Final difference: ${(products.length - totalDuplicateProducts) - cloudinaryImages}\n`);

  console.log('💡 RECOMMENDATION:\n');
  console.log('  These are TRUE duplicates from different import phases:');
  console.log('  - Liberty Visitor Chair (2 products)');
  console.log('  - Regency Visitor Chair (2 products)');
  console.log('  - Titan Visitor Chair (2 products)');
  console.log('  - Visitor Venus & Vista Chair (2 products)');
  console.log('  - Visitor Classic Chair (2 products)');
  console.log('  - Flora Visitor Chair (2 products)');
  console.log('  - BB Ergonomic Chair (2 products - visitor variant)\n');

  console.log('  Each duplicate group should be consolidated to ONE product.');
  console.log('  This would reduce 43 products → 36 products (matching 42 images - 6 variants).\n');

  const report = {
    totalProducts: products.length,
    cloudinaryImages,
    difference: products.length - cloudinaryImages,
    duplicateGroups: trueDuplicates.length,
    extraProducts: totalDuplicateProducts,
    afterCleanup: products.length - totalDuplicateProducts,
    duplicates: Array.from(trueDuplicates.entries()).map(([name, prods]) => ({
      name,
      count: prods.length,
      products: prods.map(p => ({
        id: p._id,
        slug: p.slug,
        type: p._id.startsWith('imported-product') ? 'imported' : 'created',
        image: p.publicId?.split('/').pop(),
        created: p._createdAt,
      })),
    })),
  };

  fs.writeFileSync(
    'visitor-true-duplicates-report.json',
    JSON.stringify(report, null, 2)
  );
  console.log('💾 Saved: visitor-true-duplicates-report.json\n');

  console.log('⚠️  USER DECISION REQUIRED:');
  console.log('  The user said "no deletion" but these are genuine duplicates.');
  console.log('  Options:');
  console.log('  1. Keep all 43 products (accept that some share images)');
  console.log('  2. Consolidate duplicates to 36 products (1:1 with images)');
  console.log('  3. Upload 1 more image to Cloudinary for the 43rd product\n');
}

analyzeVisitorDuplicates().catch(console.error);
