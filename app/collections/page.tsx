'use client';

import { Suspense, useState } from 'react';
import { ErrorBoundaryWrapper } from '@/components/error-boundary/client-error-boundary';
import { ProtectedCollectionsGrid } from '@/components/collections/protected-collections-grid';
import { CollectionsSkeleton } from '@/components/collections/CollectionsSkeleton';
import { CollectionsService } from '@/lib/services/collections-service';
import { Button } from '@/components/ui/button';
import type { ProductType } from '@/types/products';
import type { SeriesWithProducts, SubCategoryCollections } from '@/types/collections';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const productTypes: { value: ProductType; label: string }[] = [
  { value: 'chairs', label: 'Chairs' },
  { value: 'desks', label: 'Desks' },
  { value: 'storage-solutions', label: 'Storage Solutions' },
  { value: 'hospital-furniture', label: 'Hospital Furniture' },
  { value: 'school-furniture', label: 'School Furniture' },
  { value: 'racking-systems', label: 'Racking Systems' },
  { value: 'modular-furniture', label: 'Modular Furniture' },
];

function CollectionsPageContent() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<ProductType>('chairs');

  const handleTypeChange = (value: string) => {
    setSelectedType(value as ProductType);
  };

  const handleFiltersClear = async () => {
    try {
      await CollectionsService.clearFiltersCache(selectedType);
      toast({
        title: "Cache Cleared",
        description: `Successfully cleared filters cache for ${selectedType}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear filters cache",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Collections</h1>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={handleFiltersClear}
              className="text-sm"
            >
              Clear Filters Cache
            </Button>
          </div>
        </div>

        <Tabs value={selectedType} onValueChange={handleTypeChange} className="w-full">
          <TabsList>
            {productTypes.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-8">
        <Suspense fallback={<CollectionsSkeleton />}>
          <CollectionsLoader key={selectedType} type={selectedType} />
        </Suspense>
      </div>
    </div>
  );
}

// Export the protected version as default
export default function CollectionsPage() {
  return (
    <ErrorBoundaryWrapper>
      <CollectionsPageContent />
    </ErrorBoundaryWrapper>
  );
}

async function CollectionsLoader({ type }: { type: ProductType }) {
  // Pre-fetch collections for initial render
  const rawCollections = await CollectionsService.getCollections(type) as Record<string, SeriesWithProducts>;
  
  // Convert to expected format
  const collections = Object.entries(rawCollections).reduce((acc, [id, series]) => {
    acc[id] = {
      metadata: {
        title: series.title,
        description: series.description,
        seoDescription: series.seoDescription || '',
        coverImage: series.coverImage,
        features: series.features,
        images: series.images || [],
        lastModified: series.lastModified
      },
      products: series.products,
      features: series.features,
      materials: [], // Default empty array
      priceRange: { min: "TBD", max: "TBD" },
      specifications: {
        commonSpecs: {
          Warranty: "Standard warranty applies",
          Assembly: "Professional assembly recommended",
        },
        variableSpecs: []
      },
      lastModified: typeof series.lastModified === 'string' 
        ? series.lastModified 
        : series.lastModified.toISOString()
    };
    return acc;
  }, {} as SubCategoryCollections);
  
  return (
    <ProtectedCollectionsGrid 
      type={type}
      collections={collections} 
    />
  );
}
