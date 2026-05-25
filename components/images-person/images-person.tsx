"use client"

import * as React from "react"
import Image from "next/image"
import type { Image as TmdbImage } from "@leandrowkz/tmdb"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { getTmdbImageUrl } from "@/lib/images"

type ImagesPersonProps = {
  images: TmdbImage[]
  personName: string
}

export function ImagesPerson({ images, personName }: ImagesPersonProps) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null)
  if (!images.length) return null

  const open = openIdx !== null
  const active = open ? images[openIdx] : null
  const activeSrc = active ? getTmdbImageUrl(active.file_path, "original") : null

  return (
    <>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {images.slice(0, 16).map((img, idx) => {
          const thumb = getTmdbImageUrl(img.file_path, "w185")
          if (!thumb) return null
          return (
            <li key={img.file_path}>
              <button
                type="button"
                onClick={() => setOpenIdx(idx)}
                className="bg-muted relative block aspect-[2/3] w-full overflow-hidden rounded-md"
                aria-label={`Open image ${idx + 1}`}
              >
                <Image
                  src={thumb}
                  alt={`${personName} photo ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 33vw, 120px"
                  className="object-cover"
                />
              </button>
            </li>
          )
        })}
      </ul>
      <Dialog open={open} onOpenChange={(v) => !v && setOpenIdx(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{personName}</DialogTitle>
            <DialogDescription className="sr-only">Image preview</DialogDescription>
          </DialogHeader>
          {activeSrc && active && (
            <div
              className="bg-muted relative w-full overflow-hidden rounded-md"
              style={{ aspectRatio: `${active.width} / ${active.height}` }}
            >
              <Image src={activeSrc} alt={personName} fill className="object-contain" sizes="800px" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
