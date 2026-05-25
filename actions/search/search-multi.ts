"use server"

import type {
  MovieItem,
  PersonItem,
  TVShowItem,
} from "@leandrowkz/tmdb"
import { tmdb } from "@/lib/tmdb"

type MultiMovie = MovieItem & { media_type: "movie" }
type MultiShow = TVShowItem & { media_type: "tv" }
type MultiPerson = PersonItem & { media_type: "person" }
type MultiResult = MultiMovie | MultiShow | MultiPerson

export type SearchMultiResult = {
  movies: MultiMovie[]
  shows: MultiShow[]
  people: MultiPerson[]
}

export async function searchMulti(query: string): Promise<SearchMultiResult> {
  if (!query.trim()) {
    return { movies: [], shows: [], people: [] }
  }

  const response = await tmdb.search.multiSearch({ query })
  const results = response.results as unknown as MultiResult[]

  return {
    movies: results
      .filter((r): r is MultiMovie => r.media_type === "movie")
      .slice(0, 8),
    shows: results
      .filter((r): r is MultiShow => r.media_type === "tv")
      .slice(0, 8),
    people: results
      .filter((r): r is MultiPerson => r.media_type === "person")
      .slice(0, 8),
  }
}
