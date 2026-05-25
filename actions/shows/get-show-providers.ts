"use server"

import { unstable_cache } from "next/cache"
import type { CountryCode } from "@leandrowkz/tmdb"
import { tmdb } from "@/lib/tmdb"
import { getWatchProvidersList } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number, country: CountryCode) => {
    const response = await tmdb.tvShows.watchProviders(id)
    return getWatchProvidersList(response, country)
  },
  ["show-providers"],
  { revalidate: 1200, tags: ["show"] },
)

export async function getShowProviders(id: number, country: CountryCode) {
  return cached(id, country)
}
