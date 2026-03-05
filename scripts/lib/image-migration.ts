/**
 * Cloudinary Image Migration Utilities
 * 
 * Reusable functions for image analysis and transformation
 */

export interface SanityImage {
  url: string;
  assetId: string;
}

export interface ProductImage {
  id: string;
  name: string;
  category: string;
  series: string;
  mainImage: SanityImage | null;
  variants: SanityImage[];
}

export interface MigrationAction {
  productId: string;
  productName: string;
  type: 'auto-migrate' | 'manual-assign' | 'no-image';
  currentUrl?: string;
  suggestedCloudinaryUrl?: string;
  reason: string;
}

export interface MigrationReport {
  timestamp: string;
  summary: {
    total: number;
    autoMigrate: number;
    manualAssign: number;
    noImage: number;
  };
  migrations: {
    auto: MigrationAction[];
    manual: MigrationAction[];
    noImage: MigrationAction[];
  };
  stats: {
    sanityUrlsFound: number;
    cloudinaryUrlsFound: number;
    missingImages: number;
  };
}

const CLOUDINARY_ACCOUNT = 'dqde19mfs';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_ACCOUNT}/`;
const SANITY_CDN_BASE = 'https://cdn.sanity.io/';

export const extractAssetId = (sanityUrl: string): string => {
  // Format: https://cdn.sanity.io/images/{projectId}/{dataset}/{assetId}-{width}x{height}.{format}
  const match = sanityUrl.match(
    /cdn\.sanity\.io\/images\/[^/]+\/[^/]+\/([a-f0-9]+)-\d+x\d+/
  );
  return match ? match[1] : '';
};

export const generateCloudinaryUrl = (assetId: string, productSlug: string): string => {
  const cleanSlug = productSlug.replace(/[_-]/g, '_');
  return `${CLOUDINARY_BASE}image/${cleanSlug}/${assetId}.jpg`;
};

export const isSanityUrl = (url: string | null | undefined): boolean =>
  !!url && url.startsWith(SANITY_CDN_BASE);

export const isCloudinaryUrl = (url: string | null | undefined): boolean =>
  !!url && url.startsWith(CLOUDINARY_BASE);

export const analyzeMigrations = (products: ProductImage[]): MigrationReport => {
  const migrations: MigrationAction[] = products.flatMap((p) => {
    const baseAction = {
      productId: p.id,
      productName: p.name,
    };

    if (!p.mainImage?.url && p.variants.length === 0) {
      return [{
        ...baseAction,
        type: 'no-image' as const,
        reason: 'No images found in Sanity (mainImage and variants)',
      }];
    }

    if (isSanityUrl(p.mainImage?.url)) {
      const assetId = extractAssetId(p.mainImage!.url);
      return [{
        ...baseAction,
        type: 'auto-migrate' as const,
        currentUrl: p.mainImage!.url,
        suggestedCloudinaryUrl: assetId
          ? generateCloudinaryUrl(assetId, p.id)
          : undefined,
        reason: assetId
          ? 'Can auto-migrate from Sanity CDN to Cloudinary'
          : 'Sanity URL format unrecognized, needs manual review',
      }];
    }

    if (isCloudinaryUrl(p.mainImage?.url)) {
      return [];
    }

    return [{
      ...baseAction,
      type: 'manual-assign' as const,
      currentUrl: p.mainImage?.url,
      reason: p.mainImage?.url
        ? `Unexpected URL format: ${p.mainImage.url.substring(0, 50)}...`
        : 'mainImage exists in schema but URL is empty',
    }];
  });

  const autoMigrate = migrations.filter((m) => m.type === 'auto-migrate');
  const manualAssign = migrations.filter((m) => m.type === 'manual-assign');
  const noImage = migrations.filter((m) => m.type === 'no-image');

  return {
    timestamp: new Date().toISOString(),
    summary: {
      total: products.length,
      autoMigrate: autoMigrate.length,
      manualAssign: manualAssign.length,
      noImage: noImage.length,
    },
    migrations: {
      auto: autoMigrate,
      manual: manualAssign,
      noImage,
    },
    stats: {
      sanityUrlsFound: autoMigrate.length,
      cloudinaryUrlsFound: products.filter((p) =>
        isCloudinaryUrl(p.mainImage?.url)
      ).length,
      missingImages: noImage.length,
    },
  };
};
