"use client";

import { ProductType } from "@/types/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface Filters {
  materials: string[];
  features: string[];
  priceRanges: PriceRange[];
}

interface CollectionFiltersProps {
  type: ProductType;
  filters: Filters;
  selectedFilters: {
    materials: string[];
    features: string[];
    priceRanges: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export function CollectionFilters({
  filters,
  selectedFilters,
  onFilterChange,
}: CollectionFiltersProps) {
  return (
    <Accordion type="multiple" defaultValue={["materials", "features", "price"]} className="w-full">
      {/* Materials Filter */}
      <AccordionItem value="materials">
        <AccordionTrigger className="text-sm font-medium">
          Materials
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.materials.map((material: string) => (
              <Badge
                key={material}
                variant={selectedFilters.materials.includes(material) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFilterChange("materials", material)}
              >
                {material}
              </Badge>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Features Filter */}
      <AccordionItem value="features">
        <AccordionTrigger className="text-sm font-medium">
          Features
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.features.map((feature: string) => (
              <Badge
                key={feature}
                variant={selectedFilters.features.includes(feature) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFilterChange("features", feature)}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Price Range Filter */}
      <AccordionItem value="price">
        <AccordionTrigger className="text-sm font-medium">
          Price Range
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.priceRanges.map((range: PriceRange) => (
              <Badge
                key={range.label}
                variant={selectedFilters.priceRanges.includes(range.label) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFilterChange("priceRanges", range.label)}
              >
                {range.label}
              </Badge>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Clear Filters Button */}
      {(selectedFilters.materials.length > 0 ||
        selectedFilters.features.length > 0 ||
        selectedFilters.priceRanges.length > 0) && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              selectedFilters.materials = [];
              selectedFilters.features = [];
              selectedFilters.priceRanges = [];
              // Trigger a re-render through the parent component
              onFilterChange("", "");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </Accordion>
  );
}
