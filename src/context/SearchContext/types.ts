import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import type { ListFilters, ListPaginated } from 'src/types'

export type SearchState = {
  results: ListPaginated<MovieItem | TVShowItem>

  search: (filters?: ListFilters) => void
}
