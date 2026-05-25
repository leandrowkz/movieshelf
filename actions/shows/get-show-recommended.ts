"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number) =>
    transformListResponse(await tmdb.tvShows.recommendations(id), "tv"),
  ["show-recommended"],
  { revalidate: 1200, tags: ["show"] },
)

export async function getShowRecommended(id: number) {
  return cached(id)
}
