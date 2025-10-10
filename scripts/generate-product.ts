#!/usr/bin/env ts-node
/**
 * Product Generator CLI for Steelmade Cloudiary
 * Prompts for minimal input and generates a canonical product file.
 * Production-ready, DRY, modular, and poetic.
 * Checks for duplicate product IDs before writing.
 * Auto-updates series index file with new product export.
 * Optionally prompts for specifications and images.
 * Optionally updates documentation and memory.
 */
// Use CommonJS require for Node.js compatibility
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

async function promptSpecifications() {
  const specifications: Record<string, string> = {};
  let addMore = true;
  while (addMore) {
    const key = await ask('Specification key (e.g., Material, leave blank to finish): ');
    if (!key) break;
    const value = await ask(`Value for '${key}': `);
    specifications[key] = value;
    const more = await ask('Add another specification? (y/n): ');
    addMore = more.trim().toLowerCase() === 'y';
  }
  return specifications;
}

async function promptImages() {
  const images: Array<{ url: string; alt: string; width?: number; height?: number }> = [];
  let addMore = true;
  while (addMore) {
    const url = await ask('Image URL (leave blank to finish): ');
    if (!url) break;
    const alt = await ask('Alt text: ');
    const width = await ask('Width (optional): ');
    const height = await ask('Height (optional): ');
    images.push({ url, alt, width: width ? Number(width) : undefined, height: height ? Number(height) : undefined });
    const more = await ask('Add another image? (y/n): ');
    addMore = more.trim().toLowerCase() === 'y';
  }
  return images;
}

async function promptVariants(productName: string) {
  const variants: Array<{
    variantId: string;
    variantName: string;
    name: string;
    imageUrl: string;
    description: string;
    specifications?: Record<string, string>;
  }> = [];
  let addMore = true;
  while (addMore) {
    const variantId = await ask('Variant ID (e.g., dc-hb-black): ');
    const variantName = await ask('Variant Name (e.g., High Back Black): ');
    const variantImageUrl = await ask('Variant Image URL: ');
    const variantDescription = await ask('Variant Description: ');
    const addSpecs = await ask('Add specifications to this variant? (y/n): ');
    let specifications = undefined;
    if (addSpecs.trim().toLowerCase() === 'y') {
      specifications = await promptSpecifications();
    }
    variants.push({
      variantId,
      variantName,
      name: `${productName} - ${variantName}`,
      imageUrl: variantImageUrl,
      description: variantDescription,
      ...(specifications ? { specifications } : {})
    });
    const more = await ask('Add another variant? (y/n): ');
    addMore = more.trim().toLowerCase() === 'y';
  }
  return variants;
}

function productExists(category: string, seriesId: string, productId: string): boolean {
  const outDir = path.join(__dirname, '../lib/data/products', category, seriesId, productId);
  const outFile = path.join(outDir, 'index.ts');
  return fs.existsSync(outFile);
}

function updateSeriesIndex(category: string, seriesId: string, productId: string) {
  const seriesDir = path.join(__dirname, '../lib/data/products', category, seriesId);
  const indexFile = path.join(seriesDir, 'index.ts');
  let content = '';
  if (fs.existsSync(indexFile)) {
    content = fs.readFileSync(indexFile, 'utf8');
    // Avoid duplicate exports
    if (content.includes(`./${productId}`)) return;
    // Add export
    content += `\nexport * from './${productId}';\n`;
  } else {
    content = `export * from './${productId}';\n`;
  }
  fs.writeFileSync(indexFile, content, 'utf8');
}

function updateDocumentation(productId: string, productName: string, category: string, seriesId: string) {
  const docPath = path.join(__dirname, '../documentation/architecture/canonical-product-data-structure.md');
  const entry = `\n- [${productName}](${category}/${seriesId}/${productId}/index.ts) added on ${new Date().toISOString()}`;
  if (fs.existsSync(docPath)) {
    const content = fs.readFileSync(docPath, 'utf8');
    if (!content.includes(entry)) {
      fs.appendFileSync(docPath, entry, 'utf8');
    }
  }
}

async function main() {
  const now = new Date().toISOString();
  const imageUrl = await ask('Image URL for main variant: ');
  const productId = await ask('Product ID (e.g., dc): ');
  const productName = await ask('Product Name: ');
  const seriesId = await ask('Series ID (e.g., ergonomic-series): ');
  const category = await ask('Category (e.g., chairs): ');
  const description = await ask('Product Description: ');
  const featuresInput = await ask('Features (comma separated, leave blank for default): ');
  const features = featuresInput
    ? featuresInput.split(',').map(f => f.trim()).filter(Boolean)
    : [
        'High back and mid back ergonomic support',
        'Premium finishes',
        'Adjustable height, tilt, and armrests',
        'Lumbar support and contoured seat',
        'Sturdy, poetic construction'
      ];
  const addImages = await ask('Add images to this product? (y/n): ');
  let images: Array<{ url: string; alt: string; width?: number; height?: number }> = [];
  if (addImages.trim().toLowerCase() === 'y') {
    images = await promptImages();
  }
  const addSpecs = await ask('Add specifications to this product? (y/n): ');
  let specifications: Record<string, string> = {};
  if (addSpecs.trim().toLowerCase() === 'y') {
    specifications = await promptSpecifications();
  }
  // Check for duplicate product
  if (productExists(category, seriesId, productId)) {
    console.error(`\n❌ Product with ID '${productId}' already exists in category '${category}', series '${seriesId}'. Aborting.`);
    rl.close();
    return;
  }

  const variants = await promptVariants(productName);

  const poeticHeader = `/**\n * Auto-generated by Product Generator CLI\n * Date: ${now}\n * Author: Steelmade Cloudiary\n *\n * This file is poetic, modular, and DRY.\n */`;

  const productData = `${poeticHeader}\nimport { ExtendedProductData } from '../../../product-types';\n\nexport const ${productId}Product: ExtendedProductData = {\n  id: '${productId}',\n  name: '${productName}',\n  description: '${description}',\n  category: '${category}',\n  seriesId: '${seriesId}',\n  imageUrl: '${imageUrl}',\n  features: ${JSON.stringify(features, null, 2)},\n  ${images.length > 0 ? `images: ${JSON.stringify(images, null, 2)},\n  ` : ''}${Object.keys(specifications).length > 0 ? `specifications: ${JSON.stringify(specifications, null, 2)},\n  ` : ''}variants: ${JSON.stringify(variants, null, 2)}\n};\n`;

  const outDir = path.join(__dirname, '../lib/data/products', category, seriesId, productId);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.ts');
  fs.writeFileSync(outFile, productData, 'utf8');
  updateSeriesIndex(category, seriesId, productId);
  updateDocumentation(productId, productName, category, seriesId);
  console.log(`\n✅ Product file generated at: ${outFile}`);
  rl.close();
}

main();
