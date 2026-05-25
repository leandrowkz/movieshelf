"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"

const cached = unstable_cache(
  async (id: number) => tmdb.tvShows.videos(id),
  ["show-videos"],
  { revalidate: 1200, tags: ["show"] },
)

export async function getShowVideos(id: number) {
  return cached(id)
}
