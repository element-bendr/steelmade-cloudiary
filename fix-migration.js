const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

// We have to extract the mock data natively because Next TS is complicated outside of webpack
// I will fetch the JSON directly from your local API or redefine the array for the 5 series.
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-02-28'
});

async function run() {
  console.log("Setting up minimal categories since compilation failed, getting token status...");
  try {
     const categoryDoc = {
      _type: 'category',
      _id: 'category-chairs',
      title: 'Chairs',
      slug: { _type: 'slug', current: 'chairs' },
      description: 'Explore our complete collection of office and visitor chairs.'
    };
    await client.createOrReplace(categoryDoc);
    console.log("Token works! Connection successful.");
  } catch (e) {
    console.error(e);
  }
}
run();
