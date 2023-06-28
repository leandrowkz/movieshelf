import type { DiscoverMovieFilters } from '@leandrowkz/tmdb'
import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)

  const filters = Object.fromEntries(
    searchParams.entries()
  ) as DiscoverMovieFilters

  const { results, total_pages } = await tmdb.discover.movies(filters)

  const response = {
    data: results,
    page: Number(filters.page),
    pages: Number(total_pages),
  }

  return json(response)
}
