"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async () => {
    const { genres } = await tmdb.genres.movie()
    return genres
  },
  ["movie-genres"],
  { revalidate: 86400, tags: ["genres"] },
)

export async function getMovieGenres() {
  return cached()
}
