import type { Person } from '@leandrowkz/tmdb'
import type { PersonState } from './types'

export const initialState: PersonState = {
  person: {} as Person,
  movies: [],
  tvShows: [],

  isLoading: {
    fetchPerson: false,
    fetchMovies: false,
    fetchTVShows: false,
  },

  hasErrors: {
    fetchPerson: false,
    fetchMovies: false,
    fetchTVShows: false,
  },

  fetchPerson: () => null,
  fetchMovies: () => null,
  fetchTVShows: () => null,
}
