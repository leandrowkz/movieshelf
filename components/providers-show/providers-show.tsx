"use client"

import * as React from "react"
import Image from "next/image"
import type { WatchProvider } from "@leandrowkz/tmdb"
import { Skeleton } from "@/components/ui/skeleton"
import { SelectorCountry } from "@/components/selector-country/selector-country"
import { useCountryStore } from "@/hooks/stores/use-country-store"
import { getTmdbImageUrl } from "@/lib/images"
import type { ShowType } from "@/types/show-type"
import { getMovieProviders } from "@/actions/movies/get-movie-providers"
import { getShowProviders } from "@/actions/shows/get-show-providers"

type ProvidersShowProps = {
  showId: number
  showType: ShowType
}

export function ProvidersShow({ showId, showType }: ProvidersShowProps) {
  const country = useCountryStore((s) => s.country)
  const [providers, setProviders] = React.useState<WatchProvider[] | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    const fetcher = showType === "movie" ? getMovieProviders : getShowProviders
    fetcher(showId, country)
      .then((data) => {
        if (!cancelled) setProviders(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [showId, showType, country])

  return (
    <section aria-label="Watch providers">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Where to watch</h2>
        <SelectorCountry />
      </div>
      <div className="mt-4">
        {loading && (
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="size-12 rounded-md" />
            ))}
          </div>
        )}
        {!loading && providers && providers.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Not available in this country.
          </p>
        )}
        {!loading && providers && providers.length > 0 && (
          <ul className="flex flex-wrap items-center gap-3">
            {providers.map((p) => {
              const src = getTmdbImageUrl(p.logo_path, "w92")
              return (
                <li key={p.provider_id}>
                  <div
                    title={p.provider_name}
                    className="relative size-12 overflow-hidden rounded-md border bg-white"
                  >
                    {src && (
                      <Image
                        src={src}
                        alt={p.provider_name}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <p className="text-muted-foreground mt-3 text-xs">
        Watch provider data provided by JustWatch.
      </p>
    </section>
  )
}
