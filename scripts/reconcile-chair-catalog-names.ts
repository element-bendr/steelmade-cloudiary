#!/usr/bin/env node
import * as dotenv from "dotenv";
import { createClient } from "next-sanity";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

dotenv.config({ path: ".env.local" });

type PdfEntry = {
  code: string;
  rawName: string;
  baseName: string;
  pages: number[];
};

type SanityChair = {
  id: string;
  name: string;
  slug: string;
  series?: string;
  mainPublicId?: string;
  variantPublicIds: string[];
};

type RenameProposal = {
  id: string;
  slug: string;
  currentName: string;
  suggestedName: string;
  series?: string;
  codes: string[];
  matchedPdfCode?: string;
  matchedPdfName?: string;
  confidence: "high" | "medium";
  reason: string;
};

const PDF_PATH = path.join(process.cwd(), "docs/2026 chairs docs/STEELMADE CHAIR NEW 2026.pdf");
const OUT_DIR = path.join(process.cwd(), "reports/chair-name-reconcile");

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

function ensureOutDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (word.length <= 2 && /^[A-Z0-9]+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function normalizeCode(value: string): string {
  const m = value.match(/IC\s*-\s*([0-9]{1,4}[A-Z]?)/i) || value.match(/IC\s*([0-9]{1,4}[A-Z]?)/i);
  if (!m) return value.trim().toUpperCase();
  return `IC-${m[1].toUpperCase()}`;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toBasePdfName(raw: string): string {
  const upper = raw.toUpperCase().split(/\bIC\s*-\s*[0-9]{1,4}[A-Z]?\b/i)[0] || raw.toUpperCase();
  const cleaned = upper
    .replace(/\b(HB|MB|LB|VISITOR|VISI|S\.DX|SDX|BLACK|WHITE)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const deduped = cleaned
    .split(" ")
    .filter(Boolean)
    .filter((token, idx, arr) => idx === 0 || token !== arr[idx - 1])
    .join(" ");
  return toTitleCase(deduped);
}

function extractPdfEntries(pdfPath: string): PdfEntry[] {
  const text = execSync(`pdftotext "${pdfPath}" -`, { encoding: "utf8", maxBuffer: 1024 * 1024 * 30 });
  const pages = text.split("\f");
  const rows: Array<{ code: string; rawName: string; page: number }> = [];

  pages.forEach((pageText, pageIndex) => {
    const lines = pageText
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const codeMatch = line.match(/^IC\s*-\s*[0-9]{1,4}[A-Z]?$/i) || line.match(/^IC-\s*[0-9]{1,4}[A-Z]?$/i);
      if (!codeMatch) continue;

      const parts: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j];
        if (/^IC\s*-\s*[0-9]{1,4}[A-Z]?$/i.test(next) || /^IC-\s*[0-9]{1,4}[A-Z]?$/i.test(next)) break;
        if (!/^[0-9]+$/.test(next)) {
          parts.push(next);
        }
        if (parts.length >= 1) break;
        j += 1;
      }

      let rawName = parts.join(" ").replace(/\s+/g, " ").trim();
      if (rawName && j + 1 < lines.length) {
        const nextLine = lines[j + 1];
        if (/^(HB|MB|LB|VISITOR|VISI|BLACK|WHITE|GREY|GOLD|S\.DX|SDX)$/i.test(nextLine)) {
          rawName = `${rawName} ${nextLine}`.trim();
        }
      }
      rawName = rawName.split(/\bIC\s*-\s*[0-9]{1,4}[A-Z]?\b/i)[0].replace(/\s+/g, " ").trim();
      if (!rawName || !/[A-Za-z]/.test(rawName)) continue;

      rows.push({
        code: normalizeCode(line),
        rawName,
        page: pageIndex + 1,
      });
    }
  });

  const grouped = new Map<string, PdfEntry>();
  rows.forEach((row) => {
    const key = `${row.code}::${normalizeText(row.rawName)}`;
    const existing = grouped.get(key);
    if (existing) {
      if (!existing.pages.includes(row.page)) existing.pages.push(row.page);
      return;
    }
    grouped.set(key, {
      code: row.code,
      rawName: row.rawName,
      baseName: toBasePdfName(row.rawName),
      pages: [row.page],
    });
  });

  return [...grouped.values()].sort((a, b) => {
    if (a.code !== b.code) return a.code.localeCompare(b.code, undefined, { numeric: true });
    return a.rawName.localeCompare(b.rawName);
  });
}

function extractCodesFromValue(value?: string): string[] {
  if (!value) return [];
  const m = [...value.matchAll(/ic[-_ ]?([0-9]{1,4}[a-z]?)/gi)];
  return m.map((item) => `IC-${item[1].toUpperCase()}`);
}

function normalizeModelName(value: string): string {
  return normalizeText(value)
    .replace(/\b(chair|chairs|executive|director|ergonomic|visitor|series|office|high|mid|low|back)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(value: string): Set<string> {
  const stop = new Set(["chair", "chairs", "executive", "director", "ergonomic", "visitor", "series"]);
  return new Set(
    normalizeText(value)
      .split(" ")
      .filter((token) => token.length >= 2 && !stop.has(token))
  );
}

function inferSuffix(series?: string, currentName?: string): string {
  const s = normalizeText(series || "");
  const n = normalizeText(currentName || "");
  if (s.includes("director")) return "Director Chair";
  if (s.includes("executive")) return "Executive Chair";
  if (s.includes("ergonomic")) return "Ergonomic Chair";
  if (s.includes("visitor")) return "Visitor Chair";
  if (n.includes("director")) return "Director Chair";
  if (n.includes("executive")) return "Executive Chair";
  if (n.includes("ergonomic")) return "Ergonomic Chair";
  if (n.includes("visitor")) return "Visitor Chair";
  return "Chair";
}

async function fetchSanityChairs(): Promise<SanityChair[]> {
  const chairs = await sanityClient.fetch(`
    *[_type == "product" && category == "chairs" && !(_id in path("drafts.**"))]{
      "id": _id,
      name,
      "slug": slug.current,
      series,
      "mainPublicId": mainImage.publicId,
      "variantPublicIds": variants[].image.publicId
    }
  `);

  return chairs.map((row: any) => ({
    id: row.id,
    name: row.name || "",
    slug: row.slug || "",
    series: row.series || "",
    mainPublicId: row.mainPublicId,
    variantPublicIds: Array.isArray(row.variantPublicIds) ? row.variantPublicIds.filter(Boolean) : [],
  }));
}

function buildRenameProposals(chairs: SanityChair[], pdfEntries: PdfEntry[]) {
  const pdfByCode = new Map<string, PdfEntry[]>();
  pdfEntries.forEach((entry) => {
    const existing = pdfByCode.get(entry.code) || [];
    existing.push(entry);
    pdfByCode.set(entry.code, existing);
  });

  const proposals: RenameProposal[] = [];
  const unmatchedSanity: Array<{ id: string; slug: string; name: string }> = [];

  chairs.forEach((chair) => {
    const codeCandidates = new Set<string>([
      ...extractCodesFromValue(chair.mainPublicId),
      ...chair.variantPublicIds.flatMap((id) => extractCodesFromValue(id)),
      ...extractCodesFromValue(chair.slug),
      ...extractCodesFromValue(chair.name),
    ]);

    if (codeCandidates.size === 0) {
      unmatchedSanity.push({ id: chair.id, slug: chair.slug, name: chair.name });
      return;
    }

    let best: { code: string; entry: PdfEntry } | null = null;
    for (const code of codeCandidates) {
      const options = pdfByCode.get(code) || [];
      if (options.length === 0) continue;

      const modelKey = normalizeModelName(chair.name);
      let selected = options[0];
      if (options.length > 1 && modelKey) {
        const scored = options
          .map((entry) => {
            const baseKey = normalizeModelName(entry.baseName);
            const score = modelKey && baseKey && (modelKey.includes(baseKey) || baseKey.includes(modelKey)) ? 2 : 1;
            return { entry, score };
          })
          .sort((a, b) => b.score - a.score);
        selected = scored[0].entry;
      }

      best = { code, entry: selected };
      if (chair.mainPublicId && extractCodesFromValue(chair.mainPublicId).includes(code)) break;
    }

    if (!best) {
      unmatchedSanity.push({ id: chair.id, slug: chair.slug, name: chair.name });
      return;
    }

    const targetCore = best.entry.baseName || toTitleCase(best.entry.rawName);
    if (!targetCore || /\bIC\b/i.test(targetCore)) {
      unmatchedSanity.push({ id: chair.id, slug: chair.slug, name: chair.name });
      return;
    }
    const suffix = inferSuffix(chair.series, chair.name);
    const suggestedName = normalizeModelName(targetCore) ? `${targetCore} ${suffix}`.trim() : chair.name;
    const sameName = normalizeText(chair.name) === normalizeText(suggestedName);
    if (sameName) return;

    const mainCodeMatched = chair.mainPublicId ? extractCodesFromValue(chair.mainPublicId).includes(best.code) : false;
    const codeHasSinglePdfEntry = (pdfByCode.get(best.code) || []).length === 1;
    const currentTokens = tokenSet(chair.name);
    const targetTokens = tokenSet(targetCore);
    const overlap = [...targetTokens].filter((token) => currentTokens.has(token)).length;
    const isHigh = mainCodeMatched && codeHasSinglePdfEntry && overlap > 0;
    proposals.push({
      id: chair.id,
      slug: chair.slug,
      currentName: chair.name,
      suggestedName,
      series: chair.series,
      codes: [...codeCandidates],
      matchedPdfCode: best.code,
      matchedPdfName: best.entry.rawName,
      confidence: isHigh ? "high" : "medium",
      reason: isHigh
        ? "Matched by unique mainImage code -> PDF code"
        : "Matched by code signal but token overlap/uniqueness is weak (requires review)",
    });
  });

  const proposalIds = new Set(proposals.map((item) => item.id));
  const unchangedCount = chairs.filter((c) => !proposalIds.has(c.id)).length;

  return {
    proposals,
    unmatchedSanity,
    unchangedCount,
  };
}

async function run() {
  ensureOutDir();

  const pdfEntries = extractPdfEntries(PDF_PATH);
  const chairs = await fetchSanityChairs();
  const { proposals, unmatchedSanity, unchangedCount } = buildRenameProposals(chairs, pdfEntries);

  const pdfOut = path.join(OUT_DIR, "pdf-chair-catalog-extracted.json");
  const chairOut = path.join(OUT_DIR, "sanity-chair-inventory.json");
  const mapOut = path.join(OUT_DIR, "chair-name-rename-mapping-dry-run.json");

  fs.writeFileSync(pdfOut, JSON.stringify({ generatedAt: new Date().toISOString(), sourcePdf: PDF_PATH, entries: pdfEntries }, null, 2));
  fs.writeFileSync(chairOut, JSON.stringify({ generatedAt: new Date().toISOString(), count: chairs.length, chairs }, null, 2));
  fs.writeFileSync(
    mapOut,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        summary: {
          pdfEntries: pdfEntries.length,
          sanityChairs: chairs.length,
          renameProposals: proposals.length,
          highConfidence: proposals.filter((item) => item.confidence === "high").length,
          mediumConfidence: proposals.filter((item) => item.confidence === "medium").length,
          unmatchedSanity: unmatchedSanity.length,
          unchanged: unchangedCount,
        },
        proposals,
        unmatchedSanity,
      },
      null,
      2
    )
  );

  console.log("\n📚 Chair Name Reconciliation (Dry Run)\n");
  console.log(`PDF entries extracted: ${pdfEntries.length}`);
  console.log(`Sanity chairs scanned: ${chairs.length}`);
  console.log(`Rename proposals: ${proposals.length}`);
  console.log(`- High confidence: ${proposals.filter((item) => item.confidence === "high").length}`);
  console.log(`- Medium confidence: ${proposals.filter((item) => item.confidence === "medium").length}`);
  console.log(`Unmatched Sanity chairs: ${unmatchedSanity.length}`);
  console.log(`Unchanged chairs: ${unchangedCount}`);
  console.log("\nOutputs:");
  console.log(`- ${pdfOut}`);
  console.log(`- ${chairOut}`);
  console.log(`- ${mapOut}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
