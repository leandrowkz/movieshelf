import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from 'src/types'
import { mockGenresMoviesCodes } from './mockGenresMoviesCodes'
import { mockMoviesListPaginated } from './mockMoviesListPaginated'

export const mockGenresMoviesLists: ListByGenre<ListPaginated<MovieItem>>[] = [
  {
    genre: mockGenresMoviesCodes[0],
    data: { ...mockMoviesListPaginated },
  },
  {
    genre: mockGenresMoviesCodes[1],
    data: { ...mockMoviesListPaginated },
  },
  {
    genre: mockGenresMoviesCodes[2],
    data: { ...mockMoviesListPaginated },
  },
]
