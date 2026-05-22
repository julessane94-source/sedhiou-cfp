'use client'

import { useState } from 'react'

export interface VideoBandItem {
  id: string
  title: string
  url: string
  coverImage?: string
  caption?: string
}

type EmbeddedVideoItem = VideoBandItem & {
  embedUrl: string
}

function getEmbedUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null
  const url = rawUrl.trim().replace(/^http:\/\//i, 'https://')

  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  if (youtubeMatch) return `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}?rel=0&autoplay=0&mute=0&playsinline=1`

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

function getYoutubeThumbnail(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null
  const url = rawUrl.trim()
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

export default function VideoBand({ videos }: { videos: VideoBandItem[] }) {
  const embeddedVideos: EmbeddedVideoItem[] = videos
    .map((video) => {
      const embedUrl = getEmbedUrl(video.url)
      return embedUrl ? { ...video, embedUrl } : null
    })
    .filter((video): video is EmbeddedVideoItem => Boolean(video))

  const [selectedVideo, setSelectedVideo] = useState<EmbeddedVideoItem | null>(null)

  if (!embeddedVideos.length) return null

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#772a1d] mb-2">Vidéos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Regardez nos vidéos</h2>
          <p className="mt-3 text-stone-600">Cliquez sur une vignette pour lancer la lecture.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {embeddedVideos.map((video) => {
            const thumbnail = video.coverImage || getYoutubeThumbnail(video.url)
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setSelectedVideo(video)}
                className="group text-left rounded-3xl overflow-hidden border border-stone-200 bg-stone-50 shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#772a1d]"
              >
                <div className="relative aspect-video bg-stone-900">
                  {thumbnail ? (
                    <img src={thumbnail} alt={video.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-stone-800 text-white text-2xl">Vidéo</div>
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-3xl text-[#772a1d] shadow-lg">▶</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-stone-500 mb-2">{video.caption || 'Vidéo disponible'}</p>
                  <h3 className="text-base font-semibold text-stone-900">{video.title}</h3>
                </div>
              </button>
            )
          })}
        </div>

        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-xl">
          {selectedVideo ? (
            <div className="aspect-video bg-black">
              <iframe
                src={selectedVideo.embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>
          ) : (
            <div className="aspect-video flex flex-col items-center justify-center bg-stone-100 text-center p-8 text-stone-600">
              <p className="text-xl font-semibold mb-3">Sélectionnez une vidéo pour la regarder</p>
              <p>Les vignettes ci-dessus permettent de lancer la lecture directement.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
