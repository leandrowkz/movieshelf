import type { Genre } from '@leandrowkz/tmdb'
import { mockGenresMovies } from 'src/__mocks__/mockGenresMovies'
import { mockGenresTVShows } from 'src/__mocks__/mockGenresTVShows'

export async function fetchMoviesGenres(): Promise<Genre[]> {
  return mockGenresMovies
}

export async function fetchTVShowsGenres(): Promise<Genre[]> {
  return mockGenresTVShows
}

export const useGenresAPI = () => ({
  fetchMoviesGenres,
  fetchTVShowsGenres,
})
