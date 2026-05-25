"use server"

import { unstable_cache } from "next/cache"
import type { CountryCode } from "@leandrowkz/tmdb"
import { tmdb } from "@/lib/tmdb"
import { getWatchProvidersList } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number, country: CountryCode) => {
    const response = await tmdb.movies.watchProviders(id)
    return getWatchProvidersList(response, country)
  },
  ["movie-providers"],
  { revalidate: 1200, tags: ["movie"] },
)

export async function getMovieProviders(id: number, country: CountryCode) {
  return cached(id, country)
}
