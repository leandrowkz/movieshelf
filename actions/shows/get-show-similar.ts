"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (id: number) =>
    transformListResponse(await tmdb.tvShows.similar(id), "tv"),
  ["show-similar"],
  { revalidate: 1200, tags: ["show"] },
)

export async function getShowSimilar(id: number) {
  return cached(id)
}
