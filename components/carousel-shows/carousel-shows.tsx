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
    emblaApi.on("scroll", updateButtons)
    emblaApi.on("reInit", updateButtons)
  }, [emblaApi, updateButtons])

  if (!shows.length) return null

  return (
    <section className={cn(className)}>
      <div className="container mx-auto mb-3 flex items-end justify-between px-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
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
      <div className="sm:container sm:mx-auto sm:px-4">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="flex gap-3 pl-4 sm:gap-4 sm:pl-0">
              {shows.map((show, idx) => (
                <li
                  key={`${show.media_type ?? "show"}-${show.id}`}
                  className="min-w-0 shrink-0 basis-[42%] sm:basis-[28%] md:basis-[22%] lg:basis-[16%] xl:basis-[13%]"
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
          <div
            aria-hidden
            className={cn(
              "from-background pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-linear-to-r to-transparent transition-opacity duration-200 sm:block",
              canPrev ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "from-background pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-linear-to-l to-transparent transition-opacity duration-200 sm:block",
              canNext ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>
    </section>
  )
}
