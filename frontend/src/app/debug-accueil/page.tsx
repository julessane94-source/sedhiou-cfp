import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'

export default async function DebugAccueilPage() {
  try {
    const query = `*[_type == "accueil"][0]{
      heroTitle,
      heroSubtitle,
      videoUrl,
      contentBlocks
    }`
    const data = await client.fetch(query)
    return (
      <div style={{ padding: '2rem', background: '#fff', color: '#000' }}>
        <h1>Debug Accueil (données brutes de Sanity)</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <hr />
        <p>Vérifiez que le document existe et est publié dans Sanity Studio.</p>
        <p>Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}</p>
        <p>Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET}</p>
      </div>
    )
  } catch (error) {
    return <div style={{ padding: '2rem' }}>Erreur : {error.message}</div>
  }
}