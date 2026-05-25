"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (showId: number, seasonNumber: number) =>
    tmdb.tvSeasons.details(showId, seasonNumber),
  ["season-details"],
  { revalidate: 1200, tags: ["show"] },
)

export async function getSeasonDetails(showId: number, seasonNumber: number) {
  return cached(showId, seasonNumber)
}
