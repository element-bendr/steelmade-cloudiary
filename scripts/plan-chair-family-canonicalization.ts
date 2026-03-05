#!/usr/bin/env node
import { createClient } from "next-sanity";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config({ path: ".env.local" });

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  series: string;
  imageUrl?: string;
  description?: string;
  features?: string[];
  variantCount: number;
};

type PlannedVariant = {
  id: string;
  slug: string;
  name: string;
  variantLabel: string;
  imageUrl?: string;
};

type FamilyPlan = {
  familyKey: string;
  familyDisplayName: string;
  category: string;
  series: string;
  canonical: {
    id: string;
    slug: string;
    name: string;
  };
  variants: PlannedVariant[];
  deprecatedSlugs: string[];
  confidence: "high" | "medium";
};

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const VARIANT_RULES: Array<{
  label: string;
  test: (name: string, slug: string) => boolean;
}> = [
  {
    label: "High Back",
    test: (name, slug) => /\bhigh[\s-]*back\b|\bhb\b/i.test(name) || /-(hb|high-back)$/.test(slug),
  },
  {
    label: "Mid Back",
    test: (name, slug) => /\bmid[\s-]*back\b|\bmb\b/i.test(name) || /-(mb|mid-back)$/.test(slug),
  },
  {
    label: "Low Back",
    test: (name, slug) => /\blow[\s-]*back\b|\blb\b/i.test(name) || /-(lb|low-back)$/.test(slug),
  },
  {
    label: "Visitor",
    test: (name, slug) => /\bvisitor\b|\bvisi\b/i.test(name) || /-(visitor|visi)$/.test(slug),
  },
];

function extractVariantLabel(row: ProductRow): string | null {
  const rule = VARIANT_RULES.find((entry) => entry.test(row.name || "", row.slug || ""));
  return rule?.label || null;
}

function familyKey(row: ProductRow): string | null {
  const label = extractVariantLabel(row);
  if (!label) return null;

  const fromName = (row.name || "")
    .toLowerCase()
    .replace(/\b(high[\s-]*back|mid[\s-]*back|low[\s-]*back|visitor|visi|hb|mb|lb)\b/gi, " ")
    .replace(/[()/_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (fromName.length >= 3) return fromName;

  const fromSlug = (row.slug || "")
    .toLowerCase()
    .replace(/-(hb|mb|lb|high-back|mid-back|low-back|visitor|visi)$/g, "")
    .replace(/[-_]+/g, " ")
    .trim();

  return fromSlug.length >= 3 ? fromSlug : null;
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function canonicalPriority(label: string | null): number {
  if (label === "High Back") return 1;
  if (label === "Mid Back") return 2;
  if (label === "Low Back") return 3;
  if (label === "Visitor") return 4;
  return 9;
}

function buildFamilyPlan(rows: ProductRow[]): FamilyPlan {
  const ordered = [...rows].sort((a, b) => {
    const pa = canonicalPriority(extractVariantLabel(a));
    const pb = canonicalPriority(extractVariantLabel(b));
    if (pa !== pb) return pa - pb;
    return a.name.localeCompare(b.name);
  });

  const primary = ordered[0];
  const key = familyKey(primary) || primary.name.toLowerCase();
  const hasExecutive = ordered.some((row) => /\bexecutive\b/i.test(row.name));
  const familyDisplayName = `${toTitleCase(key)}${hasExecutive ? " Executive Chair" : ""}`.trim();

  const seenLabels = new Set<string>();
  const variants: PlannedVariant[] = ordered.map((row, idx) => {
    const preferred = extractVariantLabel(row);
    let label = preferred || row.name || `Option ${idx + 1}`;

    const low = label.toLowerCase();
    if (seenLabels.has(low)) label = row.name || `Option ${idx + 1}`;
    seenLabels.add(label.toLowerCase());

    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      variantLabel: label,
      imageUrl: row.imageUrl,
    };
  });

  const deprecatedSlugs = ordered
    .filter((row) => row.slug !== primary.slug)
    .map((row) => row.slug);

  const confidence: "high" | "medium" = variants.some((v) => ["High Back", "Mid Back", "Low Back"].includes(v.variantLabel))
    ? "high"
    : "medium";

  return {
    familyKey: key,
    familyDisplayName,
    category: primary.category,
    series: primary.series,
    canonical: {
      id: primary.id,
      slug: primary.slug,
      name: primary.name,
    },
    variants,
    deprecatedSlugs,
    confidence,
  };
}

async function run() {
  const products: ProductRow[] = await sanityClient.fetch(`
    *[_type == "product" && category == "chairs"] | order(series asc, name asc) {
      "id": _id,
      "slug": slug.current,
      name,
      category,
      series,
      "imageUrl": select(
        mainImage._type == "cloudinaryImage" => "https://res.cloudinary.com/dqde19mfs/image/upload/" + mainImage.publicId,
        mainImage.asset->url
      ),
      description,
      features,
      "variantCount": coalesce(length(variants), 0)
    }
  `);

  const candidateRows = products.filter((row) => row.variantCount === 0 && familyKey(row));
  const grouped = new Map<string, ProductRow[]>();

  candidateRows.forEach((row) => {
    const key = `${row.category}::${row.series}::${familyKey(row)}`;
    const existing = grouped.get(key) || [];
    existing.push(row);
    grouped.set(key, existing);
  });

  const familyPlans: FamilyPlan[] = [];
  grouped.forEach((rows) => {
    if (rows.length >= 2) {
      familyPlans.push(buildFamilyPlan(rows));
    }
  });

  familyPlans.sort((a, b) => {
    if (a.series !== b.series) return a.series.localeCompare(b.series);
    return a.familyDisplayName.localeCompare(b.familyDisplayName);
  });

  const bySeries: Record<string, number> = {};
  familyPlans.forEach((plan) => {
    bySeries[plan.series] = (bySeries[plan.series] || 0) + 1;
  });

  const totalProducts = familyPlans.reduce((sum, plan) => sum + plan.variants.length, 0);
  const consolidatedProducts = familyPlans.length;
  const reduction = totalProducts - consolidatedProducts;

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      candidateProducts: candidateRows.length,
      plannedFamilies: consolidatedProducts,
      productsInFamilies: totalProducts,
      potentialSkuReduction: reduction,
      bySeries,
    },
    families: familyPlans,
  };

  const outPath = "chair-family-canonicalization-plan.json";
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  console.log("\n🧭 Chair Family Canonicalization Plan\n");
  console.log(`Candidates with variant-like naming: ${candidateRows.length}`);
  console.log(`Families to canonicalize: ${consolidatedProducts}`);
  console.log(`Products in candidate families: ${totalProducts}`);
  console.log(`Potential SKU reduction: ${reduction}`);
  console.log(`Plan file: ${outPath}\n`);
  console.log("By series:");
  Object.entries(bySeries)
    .sort((a, b) => b[1] - a[1])
    .forEach(([series, count]) => console.log(`- ${series}: ${count} families`));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
