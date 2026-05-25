"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (id: number) => tmdb.movies.details(id),
  ["movie-details"],
  { revalidate: 1200, tags: ["movie"] },
)

export async function getMovieDetails(id: number) {
  return cached(id)
}
