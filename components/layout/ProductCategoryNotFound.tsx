import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCategoryNotFoundProps {
  category: string;
  customMessage?: string;
  customLinks?: Array<{
    href: string;
    label: string;
    variant?: "default" | "outline" | "secondary";
  }>;
}

export function ProductCategoryNotFound({
  category,
  customMessage,
  customLinks,
}: ProductCategoryNotFoundProps) {
  const defaultLinks = [
    {
      href: `/products/${category.toLowerCase()}`,
      label: `View All ${category}`,
      variant: "default" as const,
    },
    {
      href: "/",
      label: "Go Home",
      variant: "outline" as const,
    },
  ];

  const links = customLinks || defaultLinks;

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tighter">
          {category} Not Found
        </h1>
        <p className="text-muted-foreground">
          {customMessage || 
            `The ${category.toLowerCase()} you're looking for could not be found. 
            Please check our available ${category.toLowerCase()} or try again later.`
          }
        </p>
      </div>
      <div className="flex gap-2">
        {links.map((link) => (
          <Button key={link.href} variant={link.variant} asChild>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

// Re-export as default for easier imports in route files
export default ProductCategoryNotFound;
