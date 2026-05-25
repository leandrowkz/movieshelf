"use client"

import * as React from "react"
import { Play } from "lucide-react"
import type { Video } from "@leandrowkz/tmdb"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ButtonTrailerProps = {
  videos: Video[]
  title: string
}

type VideoLoose = Omit<Video, "type"> & { type: string }

function pickTrailer(videos: Video[]): VideoLoose | null {
  const list = videos as unknown as VideoLoose[]
  const youtubeOnly = list.filter((v) => v.site === "Youtube")
  return (
    youtubeOnly.find((v) => v.type === "Trailer" && v.official) ??
    youtubeOnly.find((v) => v.type === "Trailer") ??
    youtubeOnly.find((v) => v.type === "Teaser") ??
    youtubeOnly[0] ??
    null
  )
}

export function ButtonTrailer({ videos, title }: ButtonTrailerProps) {
  const trailer = React.useMemo(() => pickTrailer(videos), [videos])
  const [open, setOpen] = React.useState(false)

  if (!trailer) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Play className="mr-2 size-4 fill-current" />
          Watch trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{trailer.name || `${title} — Trailer`}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
          {open && (
            <iframe
              title={trailer.name}
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
