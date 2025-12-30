import type { MovieItem, TMDBResponseList } from '@leandrowkz/tmdb'
import { tmdb, dispatch } from '../../src/lib/api'
import { transformListResponse } from '../../src/lib/helpers'

export const config = {
  runtime: 'edge',
}

export default async () =>
  dispatch(async () => {
    const response = (await tmdb.trending.getTrending(
      'movie',
      'week'
    )) as TMDBResponseList<MovieItem[]>

    return transformListResponse(response, 'movie')
  })
