import { collections } from "@/lib/data/collections-data";
import CollectionsSchema from "@/components/seo/collections-schema";
import { CollectionsCanonicalUrl } from "./canonical-url";
import { metadata } from "./metadata";

export { metadata };

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CollectionsSchema collections={collections} />
      <CollectionsCanonicalUrl />
      {children}
    </>
  );
}
