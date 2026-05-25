"use server"

import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"

export async function searchShows(query: string) {
  if (!query.trim()) {
    return { data: [], page: 1, pages: 0, count: 0 }
  }
  return transformListResponse(await tmdb.search.tvShows({ query }), "tv")
}
