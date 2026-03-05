#!/usr/bin/env node
import { createClient } from "next-sanity";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config({ path: ".env.local" });

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

type PlanFile = {
  generatedAt: string;
  summary: Record<string, unknown>;
  families: FamilyPlan[];
};

type ExistingDoc = {
  _id: string;
  name?: string;
  slug?: string;
  variantCount: number;
};

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const args = process.argv.slice(2);
const execute = args.includes("--execute");
const deleteStandalone = args.includes("--delete-standalone");
const setFamilyName = args.includes("--set-family-name");
const force = args.includes("--force");
const planArgIndex = args.findIndex((arg) => arg === "--plan");
const planPath = planArgIndex >= 0 && args[planArgIndex + 1] ? args[planArgIndex + 1] : "chair-family-canonicalization-plan.json";

function extractPublicIdFromImageUrl(imageUrl?: string): string | null {
  if (!imageUrl) return null;
  const marker = "/image/upload/";
  const idx = imageUrl.indexOf(marker);
  if (idx === -1) return null;
  return imageUrl.slice(idx + marker.length) || null;
}

function toSanityVariants(variants: PlannedVariant[]) {
  return variants.map((variant, index) => ({
    _key: `cv${index}${Math.random().toString(36).slice(2, 8)}`,
    _type: "productVariant",
    id: variant.slug,
    name: variant.variantLabel || variant.name,
    image: {
      _type: "cloudinaryImage",
      publicId: variant.publicId || extractPublicIdFromImageUrl(variant.imageUrl) || "",
    },
  }));
}

async function fetchDocs(ids: string[]): Promise<Map<string, ExistingDoc>> {
  const docs: ExistingDoc[] = await sanityClient.fetch(
    `*[_type == "product" && _id in $ids]{
      _id,
      name,
      "slug": slug.current,
      "variantCount": coalesce(length(variants), 0)
    }`,
    { ids }
  );

  const map = new Map<string, ExistingDoc>();
  docs.forEach((doc) => map.set(doc._id, doc));
  return map;
}

async function run() {
  const raw = fs.readFileSync(planPath, "utf-8");
  const plan = JSON.parse(raw) as PlanFile;

  if (!Array.isArray(plan.families) || plan.families.length === 0) {
    throw new Error(`No families found in plan: ${planPath}`);
  }

  const allIds = Array.from(
    new Set(
      plan.families.flatMap((family) => [family.canonical.id, ...family.variants.map((variant) => variant.id)])
    )
  );
  const docMap = await fetchDocs(allIds);

  let eligible = 0;
  let skipped = 0;
  let toDeleteCount = 0;
  const skippedReasons: Array<{ familyKey: string; reason: string }> = [];
  const operations: FamilyPlan[] = [];

  for (const family of plan.families) {
    const canonicalDoc = docMap.get(family.canonical.id);
    if (!canonicalDoc) {
      skipped++;
      skippedReasons.push({ familyKey: family.familyKey, reason: `Missing canonical doc ${family.canonical.id}` });
      continue;
    }

    const missingVariantDocs = family.variants.filter((variant) => !docMap.has(variant.id)).map((variant) => variant.id);
    if (missingVariantDocs.length > 0) {
      skipped++;
      skippedReasons.push({
        familyKey: family.familyKey,
        reason: `Missing variant docs: ${missingVariantDocs.join(", ")}`,
      });
      continue;
    }

    const hasBlankPublicId = family.variants.some(
      (variant) => !(variant.publicId || extractPublicIdFromImageUrl(variant.imageUrl))
    );
    if (hasBlankPublicId) {
      skipped++;
      skippedReasons.push({ familyKey: family.familyKey, reason: "At least one variant lacks a Cloudinary publicId" });
      continue;
    }

    if (canonicalDoc.variantCount > 0 && !force) {
      skipped++;
      skippedReasons.push({
        familyKey: family.familyKey,
        reason: `Canonical already has ${canonicalDoc.variantCount} variants (use --force to overwrite)`,
      });
      continue;
    }

    eligible++;
    operations.push(family);
    toDeleteCount += family.variants.filter((variant) => variant.id !== family.canonical.id).length;
  }

  console.log("\n🧪 Chair Canonicalization Migration\n");
  console.log(`Mode: ${execute ? "EXECUTE" : "DRY RUN"}`);
  console.log(`Plan file: ${planPath}`);
  console.log(`Families in plan: ${plan.families.length}`);
  console.log(`Eligible families: ${eligible}`);
  console.log(`Skipped families: ${skipped}`);
  console.log(`Standalone docs in eligible families: ${toDeleteCount}`);
  console.log(`Delete mode: ${deleteStandalone ? "enabled" : "disabled"}`);
  console.log(`Set family name: ${setFamilyName ? "enabled" : "disabled"}`);
  console.log(`Force overwrite: ${force ? "enabled" : "disabled"}`);

  if (skippedReasons.length > 0) {
    console.log("\nSkipped reasons:");
    skippedReasons.slice(0, 25).forEach((item) => {
      console.log(`- ${item.familyKey}: ${item.reason}`);
    });
    if (skippedReasons.length > 25) {
      console.log(`- ...and ${skippedReasons.length - 25} more`);
    }
  }

  const redirectMap = operations.flatMap((family) =>
    family.deprecatedSlugs.map((deprecatedSlug) => ({
      category: family.category,
      series: family.series,
      from: `/${family.category}/${family.series}/${deprecatedSlug}`,
      to: `/${family.category}/${family.series}/${family.canonical.slug}`,
      familyKey: family.familyKey,
    }))
  );

  fs.writeFileSync("chair-family-canonicalization-redirects.preview.json", JSON.stringify(redirectMap, null, 2));

  if (!execute) {
    console.log("\nDry run complete. No Sanity writes performed.");
    console.log("Preview redirects file: chair-family-canonicalization-redirects.preview.json");
    return;
  }

  const executionLog: Array<{ familyKey: string; canonicalId: string; deleted: number; status: string; error?: string }> = [];

  for (const family of operations) {
    try {
      const sanityVariants = toSanityVariants(family.variants);
      const patchPayload: Record<string, unknown> = { variants: sanityVariants };
      if (setFamilyName) {
        patchPayload.name = family.familyDisplayName;
      }

      await sanityClient.patch(family.canonical.id).set(patchPayload).commit();

      let deleted = 0;
      if (deleteStandalone) {
        const toDelete = family.variants.filter((variant) => variant.id !== family.canonical.id);
        for (const variant of toDelete) {
          await sanityClient.delete(variant.id);
          deleted++;
        }
      }

      executionLog.push({
        familyKey: family.familyKey,
        canonicalId: family.canonical.id,
        deleted,
        status: "success",
      });
    } catch (error) {
      executionLog.push({
        familyKey: family.familyKey,
        canonicalId: family.canonical.id,
        deleted: 0,
        status: "failed",
        error: String(error),
      });
    }
  }

  const successCount = executionLog.filter((item) => item.status === "success").length;
  const failCount = executionLog.length - successCount;

  fs.writeFileSync(
    "chair-family-canonicalization-execution.json",
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        options: { execute, deleteStandalone, setFamilyName, force, planPath },
        summary: {
          familiesAttempted: executionLog.length,
          familiesSucceeded: successCount,
          familiesFailed: failCount,
          standaloneDeleted: executionLog.reduce((sum, item) => sum + item.deleted, 0),
        },
        executionLog,
      },
      null,
      2
    )
  );

  console.log("\nExecution complete.");
  console.log(`Families succeeded: ${successCount}`);
  console.log(`Families failed: ${failCount}`);
  console.log("Execution file: chair-family-canonicalization-execution.json");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
