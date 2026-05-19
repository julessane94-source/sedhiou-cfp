import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DebugPage() {
  const formations = await client.fetch('*[_type == "formation"]{title, _updatedAt}')
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Données brutes de Sanity</h1>
      <pre>{JSON.stringify(formations, null, 2)}</pre>
    </div>
  )
}