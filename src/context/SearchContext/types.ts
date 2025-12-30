import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import type { ListFilters, ListPaginated } from '../../types'

export type SearchState = {
  results: ListPaginated<MovieItem | TVShowItem>

  search: (filters?: ListFilters) => void
}
