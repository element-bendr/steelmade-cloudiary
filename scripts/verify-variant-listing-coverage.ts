#!/usr/bin/env node
import * as dotenv from "dotenv";
import { chromium } from "@playwright/test";

dotenv.config({ path: ".env.local" });

const baseUrl = process.env.BASE_URL || "http://localhost:3004";
const pages = [
  "/chairs/director-series",
  "/chairs/executive-series",
  "/chairs/ergonomic-series",
];

const VARIANT_NAME_SIGNAL = /\b(high[\s-]*back|mid[\s-]*back|low[\s-]*back|visitor|visi|hb|mb|lb)\b/i;

function normalizeFamilyKey(name: string): string | null {
  if (!VARIANT_NAME_SIGNAL.test(name)) return null;

  const cleaned = name
    .toLowerCase()
    .replace(/\b(high[\s-]*back|mid[\s-]*back|low[\s-]*back|visitor|visi|hb|mb|lb)\b/gi, " ")
    .replace(/[()/_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.length >= 3 ? cleaned : null;
}

type ListingCheckResult = {
  path: string;
  passed: boolean;
  checks: string[];
  failures: string[];
};

async function verifySingleListing(path: string): Promise<ListingCheckResult> {
  const result: ListingCheckResult = { path, passed: true, checks: [], failures: [] };
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const url = `${baseUrl}${path}`;
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    if (!response || !response.ok()) {
      result.passed = false;
      result.failures.push(`HTTP request failed (${response?.status() ?? "no-response"})`);
      return result;
    }

    await page.waitForSelector('[data-testid="product-grid"]', { timeout: 30_000 });
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 30_000 });
    result.checks.push("Listing grid rendered");

    const seenFamilyKeys = new Map<string, string[]>();
    let variantChipCount = 0;
    let pagesVisited = 0;
    const maxPages = 30;

    while (pagesVisited < maxPages) {
      pagesVisited += 1;
      await page.waitForSelector('[data-testid="product-card"]', { timeout: 30_000 });

      const names = await page.$$eval('[data-testid="product-card"]', (nodes) =>
        nodes
          .map((node) => node.getAttribute("data-product-name") || "")
          .map((name) => name.trim())
          .filter(Boolean)
      );

      const chipCountOnPage = await page.locator('[data-testid="quick-variant-chips"]').count();
      variantChipCount += chipCountOnPage;

      names.forEach((name) => {
        const familyKey = normalizeFamilyKey(name);
        if (!familyKey) return;
        const existing = seenFamilyKeys.get(familyKey) || [];
        existing.push(name);
        seenFamilyKeys.set(familyKey, existing);
      });

      const nextButton = page.locator('[data-testid="product-grid-next"]');
      const hasNext = (await nextButton.count()) > 0;
      if (!hasNext) break;
      if (await nextButton.isDisabled()) break;

      const pageStatus = page.locator('[data-testid="product-grid-page-status"]');
      const previousStatus = await pageStatus.textContent();

      const paginationSection = page.locator('[data-testid="product-grid-pagination"]');
      await paginationSection.scrollIntoViewIfNeeded();
      const beforeY = await page.evaluate(() => window.scrollY);

      await nextButton.click();
      let nextStatus = await pageStatus.textContent();
      for (let attempt = 0; attempt < 6 && nextStatus === previousStatus; attempt += 1) {
        // Hydration/dev overlays can delay click handlers in dev mode.
        // Retry status polling briefly before failing pagination behavior.
        // eslint-disable-next-line no-await-in-loop
        await page.waitForTimeout(500);
        // eslint-disable-next-line no-await-in-loop
        nextStatus = await pageStatus.textContent();
      }
      if (!nextStatus || nextStatus === previousStatus) {
        result.passed = false;
        result.failures.push("Pagination next click did not advance page status");
        break;
      }

      const afterY = await page.evaluate(() => window.scrollY);
      const forcedTop = beforeY > 800 && afterY < 250;
      if (forcedTop) {
        result.passed = false;
        result.failures.push(`Pagination scroll jump detected (before=${Math.round(beforeY)}, after=${Math.round(afterY)})`);
      }
    }

    const duplicateFamilies = [...seenFamilyKeys.entries()].filter(([, names]) => names.length > 1);
    if (duplicateFamilies.length > 0) {
      result.passed = false;
      duplicateFamilies.forEach(([family, names]) => {
        result.failures.push(`Ungrouped family "${family}" appears multiple times: ${names.join(", ")}`);
      });
    } else {
      result.checks.push("No duplicate standalone variant-like families across pagination");
    }

    if (variantChipCount <= 0) {
      result.passed = false;
      result.failures.push("No variant chips found in listing cards");
    } else {
      result.checks.push(`Variant chips rendered (${variantChipCount} instances across ${pagesVisited} page(s))`);
    }
  } catch (error) {
    result.passed = false;
    result.failures.push(`Runtime error: ${String(error)}`);
  } finally {
    await page.close();
    await browser.close();
  }

  return result;
}

async function verifyListingCoverage() {
  console.log("\n🔎 Variant Listing Behavior Coverage Check\n");
  console.log(`Base URL: ${baseUrl}`);

  const results: ListingCheckResult[] = [];
  for (const path of pages) {
    // eslint-disable-next-line no-await-in-loop
    const result = await verifySingleListing(path);
    results.push(result);
  }

  const passed = results.filter((result) => result.passed).length;
  const failed = results.length - passed;

  console.log(`Pages checked: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  results.forEach((result) => {
    const status = result.passed ? "✅" : "❌";
    console.log(`\n${status} ${result.path}`);
    result.checks.forEach((line) => console.log(`- ${line}`));
    result.failures.forEach((line) => console.log(`- ${line}`));
  });

  if (failed > 0) {
    process.exitCode = 1;
  }
}

verifyListingCoverage().catch((error) => {
  console.error(error);
  process.exit(1);
});
