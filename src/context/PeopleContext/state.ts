import type { Person } from '@leandrowkz/tmdb'
import type { PeopleState } from './types'

export const initialState: PeopleState = {
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
