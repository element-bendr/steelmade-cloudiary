/**
 * Product Category Inference Tool
 * 
 * Analyzes uncategorized products in Sanity and infers the correct category
 * based on product names, descriptions, and series patterns.
 * 
 * Usage:
 *   npx tsx scripts/infer-product-categories.ts
 *   npx tsx scripts/infer-product-categories.ts --json
 *   npx tsx scripts/infer-product-categories.ts --save
 * 
 * Output:
 *   - Console summary with categorization analysis
 *   - categorization-fixes.json (with --save flag)
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from 'next-sanity';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Category inference patterns
const CATEGORY_PATTERNS = {
  chairs: {
    keywords: [
      'chair', 'seating', 'seat', 'armchair', 'office chair', 'executive',
      'stool', 'lounge', 'accent', 'dining', 'task chair', 'visitor chair',
      'recliner', 'wingback', 'barstool', 'bar stool'
    ],
    seriesPatterns: [
      /^([A-Z][a-z]+)\s+Chair$/i,
      /^([A-Z][a-z]+)\s+Office/i,
      /^([A-Z][a-z]+)\s+Executive/i,
      /^([A-Z][a-z]+)\s+Lounge/i,
      /^([A-Z][a-z]+)\s+Accent/i,
    ]
  },
  desks: {
    keywords: [
      'desk', 'table', 'workstation', 'console', 'counter', 'writing',
      'computer desk', 'work table', 'standing desk', 'adjustable desk',
      'office table', 'conference table'
    ],
    seriesPatterns: [
      /^([A-Z][a-z]+)\s+Desk$/i,
      /^([A-Z][a-z]+)\s+Table$/i,
      /^([A-Z][a-z]+)\s+Workstation/i,
    ]
  },
  'modular-furniture': {
    keywords: [
      'modular', 'configurable', 'system', 'sectional', 'element',
      'modular seating', 'modular system', 'component', 'unit', 'bloc',
      'panel', 'partition', 'screen'
    ],
    seriesPatterns: [
      /^([A-Z][a-z]+)\s+System$/i,
      /^([A-Z][a-z]+)\s+Modular/i,
      /^([A-Z][a-z]+)\s+Sectional/i,
    ]
  },
  'storage-solutions': {
    keywords: [
      'storage', 'cabinet', 'shelf', 'shelving', 'drawer', 'bookcase',
      'filing', 'rack', 'locker', 'credenza', 'hutch', 'wardrobe',
      'chest', 'bench with storage', 'ottoman storage', 'storage unit',
      'storage system'
    ],
    seriesPatterns: [
      /^([A-Z][a-z]+)\s+Storage$/i,
      /^([A-Z][a-z]+)\s+Cabinet/i,
      /^([A-Z][a-z]+)\s+Shelf/i,
    ]
  }
};

interface Product {
  _id: string;
  id: string;
  name: string;
  category: string | null;
  series: string | null;
  description: string | null;
}

interface CategorizationResult {
  id: string;
  name: string;
  currentCategory: string | null;
  inferredCategory: string;
  confidence: number; // 0-100
  inferredSeries: string | null;
  reason: string;
}

interface SummaryStats {
  uncategorized_products_found: number;
  categorizations: CategorizationResult[];
  category_distribution: Record<string, number>;
  confidence_distribution: {
    high: number;    // 80-100
    medium: number;  // 50-79
    low: number;     // <50
  };
}

/**
 * Infer category from product name and description
 */
function inferCategory(product: Product): { category: string; confidence: number; reason: string; series: string | null } {
  const text = `${product.name} ${product.description || ''}`.toLowerCase();
  const scores: Record<string, { score: number; reasons: string[] }> = {
    chairs: { score: 0, reasons: [] },
    desks: { score: 0, reasons: [] },
    'modular-furniture': { score: 0, reasons: [] },
    'storage-solutions': { score: 0, reasons: [] },
  };

  // Check keywords
  Object.entries(CATEGORY_PATTERNS).forEach(([category, patterns]) => {
    patterns.keywords.forEach((keyword) => {
      if (text.includes(keyword.toLowerCase())) {
        scores[category].score += 10;
        scores[category].reasons.push(`keyword: "${keyword}"`);
      }
    });
  });

  // Check series patterns
  Object.entries(CATEGORY_PATTERNS).forEach(([category, patterns]) => {
    patterns.seriesPatterns.forEach((pattern) => {
      const match = product.name.match(pattern);
      if (match) {
        scores[category].score += 20;
        scores[category].reasons.push(`series pattern: "${product.name}"`);
      }
    });
  });

  // Bonus scoring for series name hints
  if (product.series) {
    const seriesLower = product.series.toLowerCase();
    Object.entries(CATEGORY_PATTERNS).forEach(([category, patterns]) => {
      const isMatch = patterns.keywords.some(kw => seriesLower.includes(kw));
      if (isMatch) {
        scores[category].score += 5;
        scores[category].reasons.push(`series name: "${product.series}"`);
      }
    });
  }

  // Find highest scoring category
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b.score - a.score);
  const [bestCategory, bestScore] = sorted[0];
  
  // Normalize confidence to 0-100
  const confidence = Math.min(100, bestScore.score * 5);
  
  // Extract series name from product name
  let inferredSeries: string | null = null;
  const seriesMatch = product.name.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
  if (seriesMatch) {
    inferredSeries = seriesMatch[1];
  }

  return {
    category: bestCategory,
    confidence,
    reason: bestScore.reasons.join(', ') || 'default classification',
    series: inferredSeries,
  };
}

/**
 * Main function to process uncategorized products
 */
async function inferCategories(): Promise<SummaryStats> {
  try {
    // Query for uncategorized products
    const query = `*[_type == "product" && (category == null || category == "" || category == "uncategorized")] | order(name asc) {
      _id,
      name,
      "id": slug.current,
      category,
      series,
      description
    }`;

    const products: Product[] = await client.fetch(query);

    const categorizations: CategorizationResult[] = [];
    const categoryDist: Record<string, number> = {
      chairs: 0,
      desks: 0,
      'modular-furniture': 0,
      'storage-solutions': 0,
    };
    
    const confidenceDist = {
      high: 0,
      medium: 0,
      low: 0,
    };

    // Process each uncategorized product
    products.forEach((product) => {
      const { category, confidence, reason, series } = inferCategory(product);
      
      categorizations.push({
        id: product.id,
        name: product.name,
        currentCategory: product.category || null,
        inferredCategory: category,
        confidence,
        inferredSeries: series,
        reason,
      });

      // Update distribution stats
      categoryDist[category]++;
      if (confidence >= 80) {
        confidenceDist.high++;
      } else if (confidence >= 50) {
        confidenceDist.medium++;
      } else {
        confidenceDist.low++;
      }
    });

    return {
      uncategorized_products_found: products.length,
      categorizations,
      category_distribution: categoryDist,
      confidence_distribution: confidenceDist,
    };
  } catch (error) {
    console.error('Error during categorization:', (error as Error).message);
    process.exit(1);
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const shouldSave = args.includes('--save');

  console.log('🔍 Analyzing uncategorized products...\n');

  const result = await inferCategories();

  if (isJson) {
    // Output raw JSON for programmatic use
    console.log(JSON.stringify({
      uncategorized_products_found: result.uncategorized_products_found,
      sample_categorizations: result.categorizations.slice(0, 10),
      category_distribution: result.category_distribution,
      confidence_distribution: result.confidence_distribution,
      full_results_saved_to: shouldSave ? 'categorization-fixes.json' : 'none',
    }, null, 2));
  } else {
    // Pretty print results
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║     PRODUCT CATEGORY INFERENCE ANALYSIS REPORT            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log(`📊 SUMMARY`);
    console.log(`─────────────────────────────────────────────────────────────`);
    console.log(`Uncategorized Products Found: ${result.uncategorized_products_found}`);
    
    console.log(`\n📁 INFERRED CATEGORY DISTRIBUTION`);
    console.log(`─────────────────────────────────────────────────────────────`);
    Object.entries(result.category_distribution).forEach(([cat, count]) => {
      const pct = (count / result.uncategorized_products_found * 100).toFixed(1);
      console.log(`  ${cat.padEnd(25)} ${count.toString().padStart(3)} products (${pct}%)`);
    });

    console.log(`\n🎯 CONFIDENCE DISTRIBUTION`);
    console.log(`─────────────────────────────────────────────────────────────`);
    const { high, medium, low } = result.confidence_distribution;
    console.log(`  🟢 High Confidence (80-100%)   ${high.toString().padStart(3)} products`);
    console.log(`  🟡 Medium Confidence (50-79%)  ${medium.toString().padStart(3)} products`);
    console.log(`  🔴 Low Confidence (<50%)       ${low.toString().padStart(3)} products`);

    console.log(`\n📋 SAMPLE CATEGORIZATIONS (First 20):`);
    console.log(`─────────────────────────────────────────────────────────────`);
    result.categorizations.slice(0, 20).forEach((cat) => {
      const confidenceBar = getConfidenceBar(cat.confidence);
      console.log(`\n  ${cat.name}`);
      console.log(`    Category: ${cat.inferredCategory} ${confidenceBar} ${cat.confidence}%`);
      if (cat.inferredSeries) {
        console.log(`    Series:   ${cat.inferredSeries}`);
      }
      console.log(`    Reason:   ${cat.reason}`);
    });

    if (result.categorizations.length > 20) {
      console.log(`\n  ... and ${result.categorizations.length - 20} more products\n`);
    }
  }

  // Save full categorization fixes if requested
  if (shouldSave) {
    const outputPath = path.join(__dirname, '..', 'categorization-fixes.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      uncategorized_products_found: result.uncategorized_products_found,
      generated_at: new Date().toISOString(),
      sample_categorizations: result.categorizations.slice(0, 10),
      category_distribution: result.category_distribution,
      confidence_distribution: result.confidence_distribution,
      full_categorizations: result.categorizations,
    }, null, 2));
    console.log(`\n✅ Full categorization data saved to: ${outputPath}`);
  }

  console.log('\n');
}

/**
 * Helper function to create a visual confidence bar
 */
function getConfidenceBar(confidence: number): string {
  const filled = Math.round(confidence / 10);
  const empty = 10 - filled;
  return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
