"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number) =>
    transformListResponse(await tmdb.movies.recommendations(id), "movie"),
  ["movie-recommended"],
  { revalidate: 1200, tags: ["movie"] },
)

export async function getMovieRecommended(id: number) {
  return cached(id)
}
