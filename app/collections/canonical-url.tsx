import { headers } from "next/headers";
import { CanonicalUrl } from "@/components/seo/canonical-url";

export async function CollectionsCanonicalUrl({ 
  subpath = "" 
}: { 
  subpath?: string 
}) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  
  const baseUrl = `${protocol}://${host}`;
  const path = `/collections${subpath}`;
  const domain = baseUrl;

  return <CanonicalUrl path={path} domain={domain} />;
}
