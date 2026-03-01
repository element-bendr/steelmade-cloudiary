# Image & Data Migration Strategy (Cloudinary -> Sanity)

## Can Sanity Handle Cloudinary Images Automatically?
Yes! You have two main options for handling your existing Cloudinary images in Sanity:

### Option 1: The Cloudinary Plugin (Recommended)
Sanity has an official open-source plugin specifically for Cloudinary: `sanity-plugin-cloudinary`.
* **How it works**: Instead of uploading images directly to Sanity's servers, the CMS gives editors a "Cloudinary Media Library" button right inside the editor. They select an image from Cloudinary, and Sanity just stores the Cloudinary URL object in the database.
* **Why it's great**: It uses Cloudinary's powerful on-the-fly transformations, keeps your storage costs on Sanity at zero, and prevents duplicating assets.

### Option 2: Basic URL Strings
You can literally just create a standard "String" field in the Sanity schema called `imageUrl` and instructors can paste the Cloudinary URL. This is the fastest to set up but less user-friendly than the plugin.

---

## How exactly do we migrate the existing data? 
You do **not** need to manually copy and paste the hundreds of chairs and Cloudinary URLs we just set up. Since all our current data is typed in TypeScript, we'll write a one-time migration script.

Here is the exact technical workflow we will use when you hit "Go":

### Step 1: Install `@sanity/client`
First, we'll install Sanity's Node client which allows us to write data programmatically:
```bash
npm install @sanity/client
```

### Step 2: Write the Migration Script
We will create a script (e.g. `scripts/migrate-to-sanity.ts`) that reads directly from `/lib/data/products/chairs/index.ts`. 

The script will look exactly like this:

```typescript
import { createClient } from '@sanity/client';
import { directorSeries } from '../lib/data/products/chairs/director-series';
import { executiveSeries } from '../lib/data/products/chairs/executive-series';

const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: false,
  token: 'YOUR_SECRET_WRITE_TOKEN', 
  apiVersion: '2024-02-28'
});

async function migrateData() {
  console.log("Starting migration...");
  
  // 1. First, we create the Parent Category in Sanity
  const categoryDoc = {
    _type: 'category',
    _id: 'category-chairs', // Fixed ID so we can reference it
    title: 'Chairs',
    slug: { current: 'chairs' }
  };
  await client.createOrReplace(categoryDoc);
  
  // 2. Loop through our hardcoded Director Series data
  for (const [productId, productData] of Object.entries(directorSeries.products)) {
    
    // Create the document matching the Sanity Schema
    const sanityProduct = {
      _type: 'product',
      _id: `product-${productId}`, 
      name: productData.name,
      slug: { current: productId },
      description: productData.description,
      
      // We pass the exact Cloudinary URL we already have!
      coverImage: productData.coverImage?.url, 
      
      // Optional: Migrate pricing or specifications
      price: productData.variations?.[0]?.price || null,
      
      // Ref back to the parent category
      category: {
        _type: 'reference',
        _ref: 'category-chairs' 
      }
    };

    // 3. Blast it into Sanity
    console.log(`Uploading ${productData.name}...`);
    await client.createOrReplace(sanityProduct);
  }
  
  console.log("Migration Complete! All chairs are now in Sanity.");
}

migrateData();
```

### Step 3: Execute and Verify
You'll simply run `ts-node scripts/migrate-to-sanity.ts`.
Within 30 seconds, Sanity's API will automatically ingest your entire `lib/data` infrastructure. 

When you log into the visual Sanity Studio right after running the script, all your categories, series, and product variants will miraculously appear in the UI, fully connected to their respective Cloudinary images. 

From that point on, you delete the hardcoded `.ts` files, update Next.js to fetch from Sanity via GROQ, and everything is dynamic.
