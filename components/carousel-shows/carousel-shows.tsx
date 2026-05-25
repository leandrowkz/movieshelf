"use client"

import * as React from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { MovieItem, TVShowItem } from "@leandrowkz/tmdb"
import { Button } from "@/components/ui/button"
import { CardMovie } from "@/components/card-movie/card-movie"
import { CardShow } from "@/components/card-show/card-show"
import { cn } from "@/lib/cn"

type CarouselShowsProps = {
  title: string
  shows: (MovieItem | TVShowItem)[]
  viewAllHref?: string
  className?: string
}

export function CarouselShows({
  title,
  shows,
  viewAllHref,
  className,
}: CarouselShowsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  })
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)

  const updateButtons = React.useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    updateButtons()
    emblaApi.on("select", updateButtons)
    emblaApi.on("reInit", updateButtons)
  }, [emblaApi, updateButtons])

  if (!shows.length) return null

  return (
    <section className={cn("relative", className)}>
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              View all
            </Link>
          )}
          <div className="hidden gap-1 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-4">
          {shows.map((show, idx) => (
            <li
              key={`${show.media_type ?? "show"}-${show.id}`}
              className="min-w-0 shrink-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-[14%]"
            >
              {"title" in show ? (
                <CardMovie movie={show as MovieItem} priority={idx < 3} />
              ) : (
                <CardShow show={show as TVShowItem} priority={idx < 3} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
