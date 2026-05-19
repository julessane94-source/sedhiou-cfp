import { client } from '@/lib/sanity.client'

export const dynamic = 'force-dynamic'

export default async function DebugPage() {
  let formations = []
  let error = null
  try {
    const query = '*[_type == "formation"]{title, _id, description}'
    formations = await client.fetch(query)
  } catch (err) {
    error = err.message
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Sanity</h1>
      {error && <div className="text-red-600">Erreur : {error}</div>}
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(formations, null, 2)}
      </pre>
    </div>
  )
}
