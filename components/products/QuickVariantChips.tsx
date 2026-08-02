import { cn } from "../../lib/utils";

type VariantLike = {
  id?: string;
  variantId?: string;
  name?: string | null;
};

interface QuickVariantChipsProps {
  variants?: VariantLike[];
  maxVisible?: number;
  className?: string;
}

function normalizeVariantNames(variants?: VariantLike[]): string[] {
  if (!Array.isArray(variants) || variants.length === 0) {
    return [];
  }

  const seen = new Set<string>();
  const deduped: string[] = [];

  variants.forEach((variant) => {
    const rawName = typeof variant?.name === "string" ? variant.name.trim() : "";
    if (!rawName) return;

    const key = rawName.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    deduped.push(rawName);
  });

  return deduped;
}

export function QuickVariantChips({
  variants,
  maxVisible = 3,
  className,
}: QuickVariantChipsProps) {
  const names = normalizeVariantNames(variants);
  if (names.length === 0) {
    return null;
  }

  const safeMaxVisible = Number.isFinite(maxVisible) ? Math.max(1, Math.floor(maxVisible)) : 3;
  const visible = names.slice(0, safeMaxVisible);
  const overflow = names.length - visible.length;

  return (
    <div data-testid="quick-variant-chips" className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {visible.map((name) => (
        <span
          key={name.toLowerCase()}
          title={name}
          className="inline-flex max-w-[9rem] items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-700 truncate"
        >
          {name}
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-700">
          +{overflow}
        </span>
      )}
    </div>
  );
}
