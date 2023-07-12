import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListPaginated } from 'types'
import { mockMovieDetails } from './mockMovieDetails'

export const mockMovieListPaginated: ListPaginated<MovieItem> = {
  page: 1,
  pages: 10,
  count: 10,
  data: [
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
    { ...mockMovieDetails },
  ],
}
