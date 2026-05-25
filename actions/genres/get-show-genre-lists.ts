"use server"

import { unstable_cache } from "next/cache"
import type { TVShowItem } from "@leandrowkz/tmdb"
import { tmdb } from "@/lib/tmdb"
import { transformListResponse } from "@/lib/shows"
import type { ListByGenre } from "@/types/list-by-genre"
import type { ListPaginated } from "@/types/list-paginated"

const cached = unstable_cache(
  async (genreIds: number[]) => {
    const { genres } = await tmdb.genres.tv()
    const lists: ListByGenre<ListPaginated<TVShowItem>>[] = []

    await Promise.all(
      genreIds.map(async (genreId) => {
        const response = await tmdb.discover.tv({
          with_genres: [String(genreId)],
        })
        const genre = genres.find((g) => g.id === genreId)
        if (genre) {
          lists.push({
            genre,
            data: transformListResponse(response, "tv") as ListPaginated<TVShowItem>,
          })
        }
      }),
    )

    return lists.sort(
      (a, b) => genreIds.indexOf(a.genre.id) - genreIds.indexOf(b.genre.id),
    )
  },
  ["show-genre-lists"],
  { revalidate: 86400, tags: ["genres", "shows-lists"] },
)

export async function getShowGenreLists(genreIds: number[]) {
  return cached(genreIds)
}
