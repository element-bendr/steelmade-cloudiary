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

async function consolidateVariants() {
  const EXECUTE = process.argv.includes('--execute');
  console.log(`\n🔄 CONSOLIDATING PRODUCT VARIANTS (${EXECUTE ? 'EXECUTE MODE' : 'DRY RUN'})\n`);

  // Load the consolidation plan
  const plan = JSON.parse(fs.readFileSync('variant-consolidation-plan.json', 'utf-8'));

  console.log(`📊 Plan Summary:`);
  console.log(`  Total products: ${plan.summary.totalProducts}`);
  console.log(`  Products to consolidate: ${plan.summary.productsWithVariants}`);
  console.log(`  Result: ${plan.summary.consolidatedProducts} base products`);
  console.log(`  Products to remove: ${plan.summary.spaceSaved}\n`);

  let consolidated = 0;
  let failed = 0;
  const executionLog: any[] = [];

  for (const item of plan.consolidationPlan) {
    console.log(`\n📦 ${item.baseName} (${item.series})`);
    console.log(`   Consolidating ${item.productCount} products into 1\n`);

    try {
      // Sort products: prioritize High Back > Mid Back > Low Back
      const backPriority: { [key: string]: number } = {
        'High Back': 1,
        'Mid Back': 2,
        'Low Back': 3,
        'standard': 4,
      };

      const sorted = [...item.products].sort((a: any, b: any) => {
        const aPriority = backPriority[a.variant] || 5;
        const bPriority = backPriority[b.variant] || 5;
        return aPriority - bPriority;
      });

      const primary = sorted[0];
      const variantsToAdd = sorted.slice(1);

      console.log(`   PRIMARY: ${primary.name} (${primary.slug})`);
      console.log(`   VARIANTS TO ADD: ${variantsToAdd.length}`);
      variantsToAdd.forEach((v: any) => {
        console.log(`     - ${v.variant} (${v.slug})`);
      });

      if (EXECUTE) {
        // Fetch the full primary product document
        const primaryDoc = await sanityClient.fetch(
          `*[_id == $id][0]{ ..., mainImage{ ..., asset->{ ... } } }`,
          { id: primary.id }
        );

        if (!primaryDoc) {
          throw new Error(`Primary product ${primary.id} not found`);
        }

        // Build variants array
        const variants = sorted.map((p: any) => ({
          _key: Math.random().toString(36).substring(7),
          _type: 'productVariant',
          id: p.slug,
          name: p.variant,
          image: {
            _type: 'cloudinaryImage',
            publicId: p.image,
          },
        }));

        // Update primary product
        // 1. Update name to remove variant suffix
        // 2. Update slug to base name
        // 3. Add variants array
        const baseName = item.baseName;
        const baseSlug = item.suggestedSlug;

        const updates: any = {
          name: baseName,
          variants: variants,
        };

        // Only update slug if it's different
        if (primaryDoc.slug.current !== baseSlug) {
          updates.slug = {
            _type: 'slug',
            current: baseSlug,
          };
        }

        await sanityClient.patch(primary.id).set(updates).commit();

        console.log(`     ✅ Updated primary product: ${baseName}`);

        // Delete variant products (except primary)
        for (const variant of variantsToAdd) {
          await sanityClient.delete(variant.id);
          console.log(`     🗑️  Deleted: ${variant.name} (${variant.slug})`);
        }

        console.log(`   ✅ Consolidated successfully`);

        executionLog.push({
          baseName: item.baseName,
          series: item.series,
          primaryId: primary.id,
          newSlug: baseSlug,
          variantsAdded: variants.length,
          productsDeleted: variantsToAdd.length,
          status: 'success',
        });

        consolidated++;
      } else {
        console.log(`   💡 [DRY RUN] Would consolidate into: ${item.baseName} (${item.suggestedSlug})`);
      }

    } catch (error: any) {
      console.error(`   ❌ Failed: ${error.message}`);
      executionLog.push({
        baseName: item.baseName,
        series: item.series,
        status: 'failed',
        error: error.message,
      });
      failed++;
    }

    // Small delay to avoid rate limiting
    if (EXECUTE) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  console.log(`\n\n✨ CONSOLIDATION COMPLETE\n`);
  console.log(`  Consolidated: ${consolidated}/${plan.consolidationPlan.length}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Products before: ${plan.summary.totalProducts}`);
  const productsRemoved = EXECUTE ? plan.summary.spaceSaved : 0;
  console.log(`  Products after: ${plan.summary.totalProducts - productsRemoved}\n`);

  if (EXECUTE) {
    fs.writeFileSync(
      'variant-consolidation-execution.json',
      JSON.stringify({
        timestamp: new Date().toISOString(),
        summary: {
          consolidated,
          failed,
          totalBefore: plan.summary.totalProducts,
          totalRemoved: consolidated > 0 ? plan.summary.spaceSaved : 0,
        },
        executionLog,
      }, null, 2)
    );
    console.log('💾 Execution log saved: variant-consolidation-execution.json\n');
  } else {
    console.log('💡 Run with --execute to perform consolidation\n');
  }
}

consolidateVariants().catch(console.error);
