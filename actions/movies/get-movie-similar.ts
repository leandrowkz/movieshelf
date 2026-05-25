"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number) => transformListResponse(await tmdb.movies.similar(id), "movie"),
  ["movie-similar"],
  { revalidate: 1200, tags: ["movie"] },
)

export async function getMovieSimilar(id: number) {
  return cached(id)
}
