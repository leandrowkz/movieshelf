import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListByGenre } from '../../src/types/ListByGenre'
import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const { genres } = await tmdb.genres.movie()

  const lists: ListByGenre<MovieItem>[] = []
  const genreIds = searchParams.get('with_genres')?.split(',') || []

  await Promise.all(
    genreIds.map(async (genreId) => {
      const { results: data } = await tmdb.discover.movies({
        with_genres: [genreId],
      })

      const genre = genres.find((genre) => genre.id === Number(genreId))

      if (genre) {
        lists.push({ genre, data })
      }
    })
  )

  return json(lists)
}
