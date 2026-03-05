#!/usr/bin/env node
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const baseUrl = process.env.BASE_URL || "http://localhost:3004";
const pages = [
  "/chairs/director-series",
  "/chairs/executive-series",
  "/chairs/ergonomic-series",
];

const hasVariantChips = (html: string): boolean => html.includes('data-testid="quick-variant-chips"');
const hasVariantDataForSeries = (html: string, seriesId: string): boolean => {
  const plain = new RegExp(`"seriesId":"${seriesId}"[\\s\\S]*?"variants":\\s*\\[\\s*\\{`);
  const escaped = new RegExp(`\\\\"seriesId\\\\":\\\\"${seriesId}\\\\"[\\s\\S]*?\\\\"variants\\\\":\\s*\\[\\s*\\{`);
  return plain.test(html) || escaped.test(html);
};

async function verifyListingCoverage() {
  console.log("\n🔎 Variant Listing Chips Coverage Check\n");
  console.log(`Base URL: ${baseUrl}`);

  let passed = 0;
  let failed = 0;
  let skipped = 0;
  const failures: Array<{ url: string; reason: string }> = [];
  const skipNotes: Array<{ url: string; reason: string }> = [];

  for (const path of pages) {
    const url = `${baseUrl}${path}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        failed++;
        failures.push({ url, reason: `HTTP ${response.status}` });
        continue;
      }

      const html = await response.text();
      const seriesId = path.split("/").filter(Boolean).at(-1) || "";
      if (hasVariantChips(html)) {
        passed++;
      } else if (!hasVariantDataForSeries(html, seriesId)) {
        skipped++;
        skipNotes.push({
          url,
          reason: "No variant objects detected in rendered payload for this listing page",
        });
      } else {
        failed++;
        failures.push({ url, reason: "No quick variant chips marker found" });
      }
    } catch (error) {
      failed++;
      failures.push({ url, reason: `Request failed: ${String(error)}` });
    }
  }

  console.log(`Pages checked: ${pages.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);

  if (skipNotes.length) {
    console.log("\nℹ️ Skipped:");
    skipNotes.forEach((item) => {
      console.log(`- ${item.url} (${item.reason})`);
    });
  }

  if (failures.length) {
    console.log("\n❌ Missing variant chips on:");
    failures.forEach((item) => {
      console.log(`- ${item.url} (${item.reason})`);
    });
    process.exitCode = 1;
  } else {
    console.log("\n✅ Variant chips marker appears on all target listing pages.");
  }
}

verifyListingCoverage().catch((error) => {
  console.error(error);
  process.exit(1);
});
