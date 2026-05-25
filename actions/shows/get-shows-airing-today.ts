"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (page: number) =>
    transformListResponse(await tmdb.tvShows.airingToday({ page }), "tv"),
  ["shows-airing-today"],
  { revalidate: 3600, tags: ["shows-lists"] },
)

export async function getShowsAiringToday(page = 1) {
  return cached(page)
}
