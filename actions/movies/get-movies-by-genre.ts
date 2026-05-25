"use server"

import { unstable_cache } from "next/cache"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

const cached = unstable_cache(
  async (genreId: number, page: number) =>
    transformListResponse(
      await tmdb.discover.movies({ with_genres: [String(genreId)], page }),
      "movie",
    ),
  ["movies-by-genre"],
  { revalidate: 3600, tags: ["movies-lists"] },
)

export async function getMoviesByGenre(genreId: number, page = 1) {
  return cached(genreId, page)
}
