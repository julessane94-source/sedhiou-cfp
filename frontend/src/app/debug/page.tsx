import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DebugPage() {
  try {
    // Requête avec cache explicitement désactivé
    const formations = await client.fetch('*[_type == "formation"]{title, _updatedAt}', {}, { cache: 'no-store' })
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Données brutes de Sanity</h1>
        <pre>{JSON.stringify(formations, null, 2)}</pre>
        <p>Nombre de formations : {formations.length}</p>
      </div>
    )
  } catch (error) {
    return <div>Erreur : {error.message}</div>
  }
}