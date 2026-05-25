"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (genreId: number, page: number) =>
    transformListResponse(
      await tmdb.discover.tv({ with_genres: [String(genreId)], page }),
      "tv",
    ),
  ["shows-by-genre"],
  { revalidate: 3600, tags: ["shows-lists"] },
)

export async function getShowsByGenre(genreId: number, page = 1) {
  return cached(genreId, page)
}
