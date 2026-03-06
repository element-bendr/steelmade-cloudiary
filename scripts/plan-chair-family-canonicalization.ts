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
  publicId?: string;
};

type PlannedVariant = {
  id: string;
  slug: string;
  name: string;
  variantLabel: string;
  imageUrl?: string;
  publicId?: string;
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
  strategy: "image-family" | "name-family";
};

type ResidualCandidate = {
  id: string;
  slug: string;
  name: string;
  category: string;
  series: string;
  publicId?: string;
  signal: "strong" | "weak";
  unresolvedReason: "no-family-match";
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

const STRONG_VARIANT_SIGNAL = /\b(high[\s-]*back|mid[\s-]*back|low[\s-]*back|\bhb\b|\bmb\b|\blb\b|castor|writing[\s-]*pad|with[\s-]*arms|without[\s-]*arms|w\/o[\s-]*arms)\b/i;
const WEAK_VARIANT_SIGNAL = /\b(visitor|visi|cushion|pad)\b/i;

function extractVariantLabel(row: ProductRow): string | null {
  const rule = VARIANT_RULES.find((entry) => entry.test(row.name || "", row.slug || ""));
  return rule?.label || null;
}

function normalizeSeries(series: string): string {
  return String(series || "").trim().toLowerCase();
}

function extractImageFamily(publicId?: string): string | null {
  if (!publicId) return null;
  const parts = publicId.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  // .../<family>/<asset-file>
  return parts[parts.length - 2].toLowerCase();
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
      publicId: row.publicId,
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
    strategy: "name-family",
  };
}

function buildFamilyPlanWithStrategy(
  rows: ProductRow[],
  strategy: FamilyPlan["strategy"],
  forcedFamilyKey?: string
): FamilyPlan {
  const plan = buildFamilyPlan(rows);
  return {
    ...plan,
    familyKey: forcedFamilyKey || plan.familyKey,
    familyDisplayName:
      forcedFamilyKey && forcedFamilyKey !== plan.familyKey
        ? `${toTitleCase(forcedFamilyKey)}${/\bexecutive\b/i.test(plan.familyDisplayName) ? " Executive Chair" : ""}`.trim()
        : plan.familyDisplayName,
    strategy,
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
      "publicId": mainImage.publicId,
      "imageUrl": select(
        mainImage._type == "cloudinaryImage" => "https://res.cloudinary.com/dqde19mfs/image/upload/" + mainImage.publicId,
        mainImage.asset->url
      ),
      description,
      features,
      "variantCount": coalesce(length(variants), 0)
    }
  `);

  const onlyNonVariantRows = products.filter((row) => row.variantCount === 0);
  const imageFamilyIndexForSignals = new Map<string, ProductRow[]>();
  onlyNonVariantRows.forEach((row) => {
    const imageFamily = extractImageFamily(row.publicId);
    if (!imageFamily) return;
    const key = `${normalizeSeries(row.series)}::${imageFamily}`;
    const existing = imageFamilyIndexForSignals.get(key) || [];
    existing.push(row);
    imageFamilyIndexForSignals.set(key, existing);
  });

  const candidateRows = onlyNonVariantRows.filter((row) => {
    const hasFamilyKey = Boolean(familyKey(row));
    if (!hasFamilyKey) return false;

    const name = `${row.name || ""} ${row.slug || ""}`;
    const strong = STRONG_VARIANT_SIGNAL.test(name);
    if (strong) return true;

    if (!WEAK_VARIANT_SIGNAL.test(name)) return false;
    const imageFamily = extractImageFamily(row.publicId);
    if (!imageFamily) return false;
    const key = `${normalizeSeries(row.series)}::${imageFamily}`;
    const siblings = imageFamilyIndexForSignals.get(key) || [];
    return siblings.length >= 2;
  });
  const residualCandidates: ResidualCandidate[] = candidateRows.map((row) => {
    const name = `${row.name || ""} ${row.slug || ""}`;
    const signal: ResidualCandidate["signal"] = STRONG_VARIANT_SIGNAL.test(name) ? "strong" : "weak";
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      category: row.category,
      series: row.series,
      publicId: row.publicId,
      signal,
      unresolvedReason: "no-family-match",
    };
  });
  const familyPlans: FamilyPlan[] = [];
  const usedIds = new Set<string>();

  // Strategy 1: cluster by normalized series + Cloudinary image family folder.
  const imageFamilyIndex = new Map<string, ProductRow[]>();
  onlyNonVariantRows.forEach((row) => {
    const imageFamily = extractImageFamily(row.publicId);
    if (!imageFamily) return;
    const key = `${normalizeSeries(row.series)}::${imageFamily}`;
    const existing = imageFamilyIndex.get(key) || [];
    existing.push(row);
    imageFamilyIndex.set(key, existing);
  });

  imageFamilyIndex.forEach((rows, key) => {
    if (rows.length < 2) return;
    if (!rows.some((row) => candidateRows.some((c) => c.id === row.id))) return;
    if (rows.some((row) => usedIds.has(row.id))) return;

    const forcedKey = key.split("::")[1];
    const plan = buildFamilyPlanWithStrategy(rows, "image-family", forcedKey);
    familyPlans.push(plan);
    rows.forEach((row) => usedIds.add(row.id));
  });

  // Strategy 2: fallback legacy name-based grouping for remaining candidate rows.
  const groupedByName = new Map<string, ProductRow[]>();
  candidateRows
    .filter((row) => !usedIds.has(row.id))
    .forEach((row) => {
      const key = `${normalizeSeries(row.series)}::${familyKey(row)}`;
      const existing = groupedByName.get(key) || [];
      existing.push(row);
      groupedByName.set(key, existing);
    });

  groupedByName.forEach((rows) => {
    if (rows.length < 2) return;
    if (rows.some((row) => usedIds.has(row.id))) return;
    const plan = buildFamilyPlanWithStrategy(rows, "name-family");
    familyPlans.push(plan);
    rows.forEach((row) => usedIds.add(row.id));
  });

  familyPlans.sort((a, b) => {
    if (a.series !== b.series) return a.series.localeCompare(b.series);
    return a.familyDisplayName.localeCompare(b.familyDisplayName);
  });

  const bySeries: Record<string, number> = {};
  const byStrategy: Record<string, number> = {};
  const candidateBySeries: Record<string, number> = {};
  familyPlans.forEach((plan) => {
    bySeries[plan.series] = (bySeries[plan.series] || 0) + 1;
    byStrategy[plan.strategy] = (byStrategy[plan.strategy] || 0) + 1;
  });
  residualCandidates.forEach((candidate) => {
    candidateBySeries[candidate.series] = (candidateBySeries[candidate.series] || 0) + 1;
  });

  const totalProducts = familyPlans.reduce((sum, plan) => sum + plan.variants.length, 0);
  const consolidatedProducts = familyPlans.length;
  const reduction = totalProducts - consolidatedProducts;

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      candidateProducts: candidateRows.length,
      unresolvedCandidates: residualCandidates.length,
      plannedFamilies: consolidatedProducts,
      productsInFamilies: totalProducts,
      potentialSkuReduction: reduction,
      bySeries,
      byStrategy,
      candidateBySeries,
    },
    families: familyPlans,
    residualCandidates,
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
