import type { Genre } from '@leandrowkz/tmdb'
import { mockGenresMovies } from 'src/__mocks__/mockGenresMovies'
import { mockGenresTVShows } from 'src/__mocks__/mockGenresTVShows'

async function fetchMoviesGenres(): Promise<Genre[]> {
  return mockGenresMovies
}

async function fetchTVShowsGenres(): Promise<Genre[]> {
  return mockGenresTVShows
}

export default {
  fetchMoviesGenres,
  fetchTVShowsGenres,
}
