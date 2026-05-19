import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'

export default async function DebugPage() {
  try {
    const formations = await client.fetch('*[_type == "formation"]{title}')
    return <pre>{JSON.stringify(formations, null, 2)}</pre>
  } catch (err) {
    const error = err as Error
    return <div>Erreur : {error.message}</div>
  }
}