import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'cfp-sedhiou',
  title: 'CFP SEDHIOU CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'votre_id',
  dataset: 'production',
  plugins: [deskTool()],
  schema: { types: schemaTypes },
})
