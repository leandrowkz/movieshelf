import type { Person } from '@leandrowkz/tmdb'
import type { PeopleState } from './types'

export const initialState: PeopleState = {
  person: {} as Person,
  images: [],
  movies: [],
  tvShows: [],

  isLoading: {
    fetchPerson: false,
    fetchImages: false,
    fetchMovies: false,
    fetchTVShows: false,
  },

  hasErrors: {
    fetchPerson: false,
    fetchImages: false,
    fetchMovies: false,
    fetchTVShows: false,
  },

  fetchPerson: () => null,
  fetchImages: () => null,
  fetchMovies: () => null,
  fetchTVShows: () => null,
}
