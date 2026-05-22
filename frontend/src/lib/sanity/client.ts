import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  // Use the CDN in production for better performance; use drafts in development
  useCdn: process.env.NODE_ENV === 'production',
  // Provide token only when set (e.g. for CI or preview builds)
  token: process.env.SANITY_API_TOKEN || undefined,
  perspective: process.env.NODE_ENV === 'development' ? 'drafts' : 'published',
})