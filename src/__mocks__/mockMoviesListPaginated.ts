import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListPaginated } from 'src/types'
import { mockMovieDetails } from './mockMovieDetails'

export const mockMoviesListPaginated: ListPaginated<MovieItem> = {
  page: 1,
  pages: 10,
  count: 10,
  isLoading: false,
  hasErrors: false,
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
