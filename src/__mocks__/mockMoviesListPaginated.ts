import { MovieItem } from '@leandrowkz/tmdb'
import { mockMovieDetails } from './mockMovieDetails'
import { ListPaginated } from 'src/types/ListPaginated'

export const mockMovieListPaginated: ListPaginated<MovieItem> = {
  page: 1,
  pages: 10,
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
