#!/usr/bin/env node
import * as dotenv from "dotenv";
import { createClient } from "next-sanity";
import * as fs from "node:fs";
import * as path from "node:path";

dotenv.config({ path: ".env.local" });

type RenameProposal = {
  id: string;
  slug: string;
  currentName: string;
  suggestedName: string;
  confidence: "high" | "medium";
};

type MappingFile = {
  summary: Record<string, number>;
  proposals: RenameProposal[];
};

const args = process.argv.slice(2);
const execute = args.includes("--execute");
const includeMedium = args.includes("--include-medium");
const mapPathArgIndex = args.findIndex((item) => item === "--map");
const mapPath =
  mapPathArgIndex >= 0 && args[mapPathArgIndex + 1]
    ? args[mapPathArgIndex + 1]
    : "reports/chair-name-reconcile/chair-name-rename-mapping-dry-run.json";

const outDir = path.join(process.cwd(), "reports/chair-name-reconcile");

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

function loadMapping(filePath: string): MappingFile {
  const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!payload || !Array.isArray(payload.proposals)) {
    throw new Error(`Invalid mapping file: ${filePath}`);
  }
  return payload as MappingFile;
}

async function run() {
  const mapping = loadMapping(path.isAbsolute(mapPath) ? mapPath : path.join(process.cwd(), mapPath));
  fs.mkdirSync(outDir, { recursive: true });

  const selected = mapping.proposals.filter((item) => includeMedium || item.confidence === "high");

  const snapshot: Array<{ id: string; slug: string; beforeName: string; afterName: string; confidence: string }> = [];
  const skipped: Array<{ id: string; reason: string }> = [];
  let updated = 0;

  for (const item of selected) {
    // eslint-disable-next-line no-await-in-loop
    const row = await sanityClient.fetch(`*[_id == $id][0]{_id, name, "slug": slug.current}`, { id: item.id });
    if (!row) {
      skipped.push({ id: item.id, reason: "missing-document" });
      continue;
    }
    if ((row.name || "").trim() === item.suggestedName.trim()) {
      skipped.push({ id: item.id, reason: "already-updated" });
      continue;
    }

    snapshot.push({
      id: item.id,
      slug: row.slug || item.slug,
      beforeName: row.name || "",
      afterName: item.suggestedName,
      confidence: item.confidence,
    });

    if (execute) {
      // eslint-disable-next-line no-await-in-loop
      await sanityClient.patch(item.id).set({ name: item.suggestedName }).commit();
      updated += 1;
    }
  }

  const now = new Date().toISOString().replace(/[:.]/g, "-");
  const snapshotPath = path.join(outDir, `chair-name-rename-snapshot-${now}.json`);
  const executionPath = path.join(outDir, `chair-name-rename-execution-${now}.json`);

  fs.writeFileSync(snapshotPath, JSON.stringify({ generatedAt: new Date().toISOString(), execute, includeMedium, rows: snapshot }, null, 2));
  fs.writeFileSync(
    executionPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        execute,
        includeMedium,
        selected: selected.length,
        toUpdate: snapshot.length,
        updated,
        skippedCount: skipped.length,
        skipped,
      },
      null,
      2
    )
  );

  console.log("\n🛠️ Apply Chair Name Reconciliation\n");
  console.log(`Mode: ${execute ? "EXECUTE" : "DRY RUN"}`);
  console.log(`Confidence scope: ${includeMedium ? "high + medium" : "high only"}`);
  console.log(`Selected proposals: ${selected.length}`);
  console.log(`Rows to update: ${snapshot.length}`);
  console.log(`Rows updated: ${updated}`);
  console.log(`Rows skipped: ${skipped.length}`);
  console.log(`Snapshot: ${snapshotPath}`);
  console.log(`Execution log: ${executionPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
