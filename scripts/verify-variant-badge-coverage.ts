#!/usr/bin/env node
import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

type VariantProduct = {
  name: string;
  category: string;
  series: string;
  slug: string;
  variantCount: number;
};

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const toSeriesPath = (series: string): string => series.toLowerCase().replace(/\s+/g, '-');

const hasVariantBadge = async (url: string): Promise<boolean> => {
  const res = await fetch(url);
  if (!res.ok) return false;
  const html = await res.text();
  return html.includes('Selected variant:');
};

async function verifyCoverage() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3004';

  const products: VariantProduct[] = await sanityClient.fetch(`
    *[_type == "product" && defined(variants) && length(variants) > 0] | order(category asc, series asc, name asc) {
      name,
      category,
      series,
      "slug": slug.current,
      "variantCount": length(variants)
    }
  `);

  if (!products.length) {
    console.log('No products with variants found.');
    return;
  }

  let passed = 0;
  let failed = 0;
  const failedUrls: Array<{ name: string; url: string; variantCount: number }> = [];

  for (const product of products) {
    const url = `${baseUrl}/${product.category}/${toSeriesPath(product.series)}/${product.slug}`;
    const ok = await hasVariantBadge(url);

    if (ok) {
      passed++;
    } else {
      failed++;
      failedUrls.push({ name: product.name, url, variantCount: product.variantCount });
    }
  }

  console.log('\n🔎 Variant Badge Coverage Check\n');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Products with variants: ${products.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failedUrls.length) {
    console.log('\n❌ Missing badge on:');
    failedUrls.forEach((item) => {
      console.log(`- ${item.name} (${item.variantCount} variants) -> ${item.url}`);
    });
  } else {
    console.log('\n✅ Badge appears on all variant-enabled product pages.');
  }
}

verifyCoverage().catch((error) => {
  console.error(error);
  process.exit(1);
});
