import type {
  DiscoverMovieFilters,
  DiscoverTVShowFilters,
  MovieItem,
  TVShowItem,
} from '@leandrowkz/tmdb'
import { json, tmdb } from '../api'
import { ListPaginated, ShowType } from '../../types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const showType = searchParams.get('showType') as ShowType

  const filters = Object.fromEntries(searchParams.entries()) as
    | DiscoverMovieFilters
    | DiscoverTVShowFilters

  const { results, total_pages, total_results } =
    showType === 'movie'
      ? await tmdb.discover.movies(filters)
      : await tmdb.discover.tv(filters)

  const response: ListPaginated<MovieItem | TVShowItem> = {
    data: results,
    count: total_results,
    page: Number(filters.page || 1),
    pages: Number(total_pages),
  }

  return json(response)
}
