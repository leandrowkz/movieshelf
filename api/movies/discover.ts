import type { DiscoverMovieFilters } from '@leandrowkz/tmdb'
import { dispatch, tmdb } from '../../src/lib/api'
import { transformListResponse } from '../../src/lib/helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)

    const filters = Object.fromEntries(
      searchParams.entries()
    ) as DiscoverMovieFilters

    const response = await tmdb.discover.movies(filters)

    return transformListResponse(response, 'movie')
  })
