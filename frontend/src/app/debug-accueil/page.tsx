import { client } from '@/lib/sanity/client'

export const dynamic = 'force-dynamic'

export default async function DebugAccueil() {
  const data = await client.fetch(`*[_type == "accueil"][0]{
    heroTitle,
    videoUrl,
    "directorImage": directorMessage.image.asset->url,
    "caiImage": caiMessage.image.asset->url
  }`)
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}