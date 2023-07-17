import type { TVShowItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from '../../src/types'
import { json, tmdb } from '../api'
import { transformListResponse } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const { genres } = await tmdb.genres.tv()

  const lists: ListByGenre<ListPaginated<TVShowItem>>[] = []
  const genreIds = searchParams.get('with_genres')?.split(',') || []

  await Promise.all(
    genreIds.map(async (genreId) => {
      const response = await tmdb.discover.tv({
        with_genres: [genreId],
      })

      const genre = genres.find((genre) => genre.id === Number(genreId))

      if (genre) {
        lists.push({
          genre,
          data: transformListResponse(
            response,
            'tv'
          ) as ListPaginated<TVShowItem>,
        })
      }
    })
  )

  return json(lists)
}
