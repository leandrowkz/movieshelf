"use client"

import * as React from "react"
import type { TVSeason, TVSeasonItem } from "@leandrowkz/tmdb"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { EpisodesList } from "@/components/episodes-list/episodes-list"
import { getSeasonDetails } from "@/actions/seasons/get-season-details"

type SeasonsTabsProps = {
  showId: number
  seasons: TVSeasonItem[]
}

export function SeasonsTabs({ showId, seasons }: SeasonsTabsProps) {
  const eligible = seasons.filter((s) => s.season_number >= 1)
  const initial = eligible[0]?.season_number ?? 1

  const [current, setCurrent] = React.useState(String(initial))
  const [cache, setCache] = React.useState<Record<string, TVSeason | "loading">>({})

  React.useEffect(() => {
    if (cache[current]) return
    setCache((c) => ({ ...c, [current]: "loading" }))
    getSeasonDetails(showId, Number(current)).then((data) => {
      setCache((c) => ({ ...c, [current]: data }))
    })
  }, [current, showId, cache])

  if (!eligible.length) return null

  return (
    <Tabs value={current} onValueChange={setCurrent}>
      <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
        {eligible.map((s) => (
          <TabsTrigger
            key={s.id}
            value={String(s.season_number)}
            className="data-[state=active]:bg-accent rounded-md border"
          >
            Season {s.season_number}
          </TabsTrigger>
        ))}
      </TabsList>
      {eligible.map((s) => {
        const data = cache[String(s.season_number)]
        const isLoading = data === "loading" || data === undefined
        const season = !isLoading ? (data as TVSeason) : null
        return (
          <TabsContent key={s.id} value={String(s.season_number)} className="mt-6">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : (
              <EpisodesList episodes={season!.episodes} />
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
