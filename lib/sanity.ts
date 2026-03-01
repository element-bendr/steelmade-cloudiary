import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-28'

export const client = createClient({
  projectId,
  dataset,
  apiVersion, 
  useCdn: false, // Set to false if webhook revalidation is used
})
