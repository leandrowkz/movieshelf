import type { DiscoverMovieFilters } from '@leandrowkz/tmdb'
import { tmdb } from '../api'
import { transformListResponse } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)

  const filters = Object.fromEntries(
    searchParams.entries()
  ) as DiscoverMovieFilters

  const response = await tmdb.discover.movies(filters)

  return transformListResponse(response, 'movie')
}
