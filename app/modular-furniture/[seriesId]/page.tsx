// app/modular-furniture/[seriesId]/page.tsx
// TEMPORARILY DISABLED - During refactor, send users to the modular-furniture category root
// to avoid redirect loops until series pages are re-enabled.
import { redirect } from "next/navigation";

interface ModularFurnitureSeriesPageProps {
  params: {
    seriesId: string;
  };
}

export default function ModularFurnitureSeriesPage({ params }: ModularFurnitureSeriesPageProps) {
  // Previously redirected to the same URL which caused an infinite loop.
  // Send users to the category index while series pages are being rebuilt.
  redirect('/modular-furniture');
}
