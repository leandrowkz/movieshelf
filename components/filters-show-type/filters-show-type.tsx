"use client"

import * as React from "react"
import type { ListByJob } from "@/types/list-by-job"
import type { ShowItem } from "@/types/show-item"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ListShows } from "@/components/list-shows/list-shows"

type FiltersShowTypeProps = {
  movies: ListByJob<ShowItem[]>[]
  shows: ListByJob<ShowItem[]>[]
}

export function FiltersShowType({ movies, shows }: FiltersShowTypeProps) {
  const hasMovies = movies.some((g) => g.data.length > 0)
  const hasShows = shows.some((g) => g.data.length > 0)
  const [tab, setTab] = React.useState<"movie" | "tv">(
    hasMovies ? "movie" : "tv",
  )

  if (!hasMovies && !hasShows) return null

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as "movie" | "tv")}>
      <TabsList>
        {hasMovies && <TabsTrigger value="movie">Movies</TabsTrigger>}
        {hasShows && <TabsTrigger value="tv">TV Shows</TabsTrigger>}
      </TabsList>
      {hasMovies && (
        <TabsContent value="movie" className="mt-6 space-y-10">
          {movies.map((group, i) => (
            <section key={`m-${group.job}-${i}`}>
              <h3 className="mb-3 text-lg font-semibold">{group.job}</h3>
              <ListShows shows={group.data} />
            </section>
          ))}
        </TabsContent>
      )}
      {hasShows && (
        <TabsContent value="tv" className="mt-6 space-y-10">
          {shows.map((group, i) => (
            <section key={`s-${group.job}-${i}`}>
              <h3 className="mb-3 text-lg font-semibold">{group.job}</h3>
              <ListShows shows={group.data} />
            </section>
          ))}
        </TabsContent>
      )}
    </Tabs>
  )
}
