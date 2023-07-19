import type { TVShowItem } from '@leandrowkz/tmdb'
import type { ListPaginated } from 'src/types'
import { mockTVShow } from './mockTVShow'

export const mockTVShowsListPaginated: ListPaginated<TVShowItem> = {
  page: 1,
  pages: 10,
  count: 10,
  isLoading: false,
  hasErrors: false,
  data: [
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
    { ...mockTVShow },
  ],
}
