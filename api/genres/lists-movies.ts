import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from '../../src/types'
import { dispatch, tmdb } from '../api'
import { transformListResponse } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const { genres } = await tmdb.genres.movie()

    const lists: ListByGenre<ListPaginated<MovieItem>>[] = []
    const genreIds = searchParams.get('with_genres')?.split(',') || []

    await Promise.all(
      genreIds.map(async (genreId) => {
        const response = await tmdb.discover.movies({
          with_genres: [genreId],
        })

        const genre = genres.find((genre) => genre.id === Number(genreId))

        if (genre) {
          lists.push({
            genre,
            data: transformListResponse(
              response,
              'movie'
            ) as ListPaginated<MovieItem>,
          })
        }
      })
    )

    return lists
  })
