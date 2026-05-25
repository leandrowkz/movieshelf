"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (id: number) => tmdb.movies.credits(id),
  ["movie-credits"],
  { revalidate: 1200, tags: ["movie"] },
)

export async function getMovieCredits(id: number) {
  return cached(id)
}
