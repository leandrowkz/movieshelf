"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (id: number) => tmdb.tvShows.credits(id),
  ["show-credits"],
  { revalidate: 1200, tags: ["show"] },
)

export async function getShowCredits(id: number) {
  return cached(id)
}
