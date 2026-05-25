"use client"

import * as React from "react"
import type { TVSeason, TVSeasonItem } from "@leandrowkz/tmdb"
import { Skeleton } from "@/components/ui/skeleton"
import { EpisodesList } from "@/components/episodes-list/episodes-list"
import { getSeasonDetails } from "@/actions/seasons/get-season-details"
import { cn } from "@/lib/cn"

type SeasonsTabsProps = {
  showId: number
  seasons: TVSeasonItem[]
}

export function SeasonsTabs({ showId, seasons }: SeasonsTabsProps) {
  const eligible = seasons.filter((s) => s.season_number >= 1)
  const initial = eligible[0]?.season_number ?? 1

  const [current, setCurrent] = React.useState<number>(initial)
  const [cache, setCache] = React.useState<Record<number, TVSeason | "loading">>({})

  React.useEffect(() => {
    if (cache[current]) return
    setCache((c) => ({ ...c, [current]: "loading" }))
    getSeasonDetails(showId, current).then((data) => {
      setCache((c) => ({ ...c, [current]: data }))
    })
  }, [current, showId, cache])

  if (!eligible.length) return null

  const currentData = cache[current]
  const isLoading = currentData === "loading" || currentData === undefined
  const season = !isLoading ? (currentData as TVSeason) : null

  return (
    <div>
      <div
        role="tablist"
        aria-label="Seasons"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "thin" }}
      >
        {eligible.map((s) => {
          const active = s.season_number === current
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCurrent(s.season_number)}
              className={cn(
                "shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              Season {s.season_number}
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <EpisodesList episodes={season!.episodes} />
        )}
      </div>
    </div>
  )
}
