"use server"

import { unstable_cache } from "next/cache"
import type { MovieItem } from "@leandrowkz/tmdb"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"
import type { ListByGenre } from "@/types/list-by-genre"
import type { ListPaginated } from "@/types/list-paginated"

const cached = unstable_cache(
  async (genreIds: number[]) => {
    const { genres } = await tmdb.genres.movie()
    const lists: ListByGenre<ListPaginated<MovieItem>>[] = []

    await Promise.all(
      genreIds.map(async (genreId) => {
        const response = await tmdb.discover.movies({
          with_genres: [String(genreId)],
        })
        const genre = genres.find((g) => g.id === genreId)
        if (genre) {
          lists.push({
            genre,
            data: transformListResponse(response, "movie") as ListPaginated<MovieItem>,
          })
        }
      }),
    )

    return lists.sort(
      (a, b) => genreIds.indexOf(a.genre.id) - genreIds.indexOf(b.genre.id),
    )
  },
  ["movie-genre-lists"],
  { revalidate: 86400, tags: ["genres", "movies-lists"] },
)

export async function getMovieGenreLists(genreIds: number[]) {
  return cached(genreIds)
}
