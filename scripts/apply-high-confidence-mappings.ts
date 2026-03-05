#!/usr/bin/env node
/**
 * Apply high-confidence Cloudinary mappings to Sanity products
 */

import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function applyHighConfidenceMappings() {
  console.log('🔄 Loading unmapped Cloudinary images analysis...\n');
  
  const analysis = JSON.parse(fs.readFileSync('unmapped-cloudinary-images.json', 'utf8'));
  const highConfidence = analysis.suggestedMappings.filter((m: any) => m.confidence === 'high');
  
  console.log(`Found ${highConfidence.length} high-confidence mappings to apply\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const mapping of highConfidence) {
    try {
      console.log(`🔄 Updating: ${mapping.suggestedProductName}`);
      console.log(`   From: ${mapping.cloudinaryUrl}\n`);
      
      await sanityClient
        .patch(mapping.suggestedProduct)
        .set({
          mainImage: {
            _type: 'cloudinaryImage',
            cloudinaryUrl: mapping.cloudinaryUrl,
            publicId: mapping.cloudinaryImage,
          }
        })
        .commit();
      
      successCount++;
      console.log(`✅ Success\n`);
    } catch (error: any) {
      errorCount++;
      console.error(`❌ Error: ${error.message}\n`);
    }
  }
  
  console.log(`\n✅ Applied ${successCount} high-confidence mappings`);
  console.log(`❌ Failed ${errorCount} mappings`);
}

applyHighConfidenceMappings();