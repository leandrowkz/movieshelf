"use server"

import { unstable_cache } from "next/cache"
import type { MovieItem, TMDBResponseList } from "@leandrowkz/tmdb"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async () => {
    const response = (await tmdb.trending.getTrending(
      "movie",
      "week",
    )) as TMDBResponseList<MovieItem[]>
    return transformListResponse(response, "movie")
  },
  ["movies-trending"],
  { revalidate: 3600, tags: ["movies-lists"] },
)

export async function getMoviesTrending() {
  return cached()
}
