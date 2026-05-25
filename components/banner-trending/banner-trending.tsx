"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import type { MovieItem } from "@leandrowkz/tmdb"
import { RatingScore } from "@/components/rating-score/rating-score"
import { getTmdbImageUrl } from "@/lib/images"
import { formatYear } from "@/lib/format"
import { cn } from "@/lib/cn"

type BannerTrendingProps = {
  movies: MovieItem[]
  className?: string
}

export function BannerTrending({ movies, className }: BannerTrendingProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 6000)
    return () => clearInterval(id)
  }, [emblaApi])

  const top = movies.slice(0, 5)
  if (!top.length) return null

  return (
    <section className={cn("relative", className)} aria-label="Trending this week">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <ul className="flex">
          {top.map((movie, idx) => {
            const backdrop = getTmdbImageUrl(movie.backdrop_path, "w1280")
            return (
              <li key={movie.id} className="min-w-0 shrink-0 grow-0 basis-full">
                <Link
                  href={`/movie/${movie.id}`}
                  className="relative block aspect-[4/5] w-full sm:aspect-[21/9]"
                >
                  {backdrop && (
                    <Image
                      src={backdrop}
                      alt={movie.title}
                      fill
                      priority={idx === 0}
                      sizes="100vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-8">
                    <div className="max-w-2xl">
                      <p className="text-xs uppercase tracking-widest text-white/70">
                        Trending #{idx + 1}
                      </p>
                      <h2 className="mt-1 text-2xl font-bold sm:text-4xl">
                        {movie.title}
                      </h2>
                      <div className="mt-2 flex items-center gap-3 text-sm text-white/80">
                        <span>{formatYear(movie.release_date)}</span>
                        <RatingScore value={movie.vote_average} size="md" className="text-white" />
                      </div>
                      {movie.overview && (
                        <p className="mt-3 hidden max-w-xl text-sm text-white/90 sm:line-clamp-3">
                          {movie.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {top.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selectedIndex ? "w-6 bg-white" : "w-2 bg-white/50",
            )}
          />
        ))}
      </div>
    </section>
  )
}
