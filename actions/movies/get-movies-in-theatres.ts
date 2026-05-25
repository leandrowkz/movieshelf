"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (page: number) =>
    transformListResponse(await tmdb.movies.nowPlaying({ page }), "movie"),
  ["movies-in-theatres"],
  { revalidate: 3600, tags: ["movies-lists"] },
)

export async function getMoviesInTheatres(page = 1) {
  return cached(page)
}
