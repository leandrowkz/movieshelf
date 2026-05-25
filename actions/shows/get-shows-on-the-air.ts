"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (page: number) =>
    transformListResponse(await tmdb.tvShows.onTheAir({ page }), "tv"),
  ["shows-on-the-air"],
  { revalidate: 3600, tags: ["shows-lists"] },
)

export async function getShowsOnTheAir(page = 1) {
  return cached(page)
}
