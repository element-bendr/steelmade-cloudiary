// app/modular-furniture/[seriesId]/page.tsx
// TEMPORARILY DISABLED - Redirect to generic series page during refactoring
import { redirect } from "next/navigation";

interface ModularFurnitureSeriesPageProps {
  params: {
    seriesId: string;
  };
}

export default function ModularFurnitureSeriesPage({ params }: ModularFurnitureSeriesPageProps) {
  // Redirect to generic series page implementation
  redirect(`/modular-furniture/${params.seriesId}`);
}