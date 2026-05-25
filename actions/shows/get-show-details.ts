"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (id: number) => {
    const show = await tmdb.tvShows.details(id)
    show.media_type = "tv"
    return show
  },
  ["show-details"],
  { revalidate: 1200, tags: ["show"] },
)

export async function getShowDetails(id: number) {
  return cached(id)
}
