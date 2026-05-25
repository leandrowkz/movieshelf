"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (page: number) =>
    transformListResponse(await tmdb.movies.popular({ page }), "movie"),
  ["movies-popular"],
  { revalidate: 3600, tags: ["movies-lists"] },
)

export async function getMoviesPopular(page = 1) {
  return cached(page)
}
