import { MovieItem } from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'
import { mockGenresMovies } from './mockGenresMovies'
import { mockMovieDetails } from './mockMovieDetails'

export const mockMoviesListsByGenres: ListByGenre<MovieItem>[] = [
  {
    genre: mockGenresMovies[0],
    data: [
      { ...mockMovieDetails },
      { ...mockMovieDetails },
      { ...mockMovieDetails },
    ],
  },
  {
    genre: mockGenresMovies[1],
    data: [
      { ...mockMovieDetails },
      { ...mockMovieDetails },
      { ...mockMovieDetails },
    ],
  },
  {
    genre: mockGenresMovies[2],
    data: [
      { ...mockMovieDetails },
      { ...mockMovieDetails },
      { ...mockMovieDetails },
    ],
  },
]
