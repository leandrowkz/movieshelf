import { TVShowItem } from '@leandrowkz/tmdb'
import { ListPaginated } from 'src/types/ListPaginated'
import { mockTVShow } from './mockTVShow'

export const mockTVShowsListPaginated: ListPaginated<TVShowItem> = {
  page: 1,
  pages: 10,
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
