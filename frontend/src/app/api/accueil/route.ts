import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

const query = `*[_type == "accueil"][0]{
  heroTitle,
  heroSubtitle,
  videoUrl,
  heroImage,
  carouselImages[]{ "url": asset->url },
  directorMessage { title, content, "image": image.asset->url, signature },
  caiMessage { title, content, "image": image.asset->url, signature },
  featuredEvents[]->{ _id, title, excerpt, "slug": slug.current, "coverImage": coverImage.asset->url, publishedAt },
  featuredFormations[]->{ _id, title, description, "slug": slug.current, "imageUrl": image.asset->url },
  stats[]{ value, label },
  bottomCta { text, link }
}`

export async function GET() {
  try {
    const data = await client.fetch(query)
    return NextResponse.json(data)
  } catch (err) {
    console.error('API /api/accueil error', err)
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch accueil' }), { status: 500 })
  }
}
