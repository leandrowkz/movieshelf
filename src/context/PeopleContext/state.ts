import type { Image, Person } from '@leandrowkz/tmdb'
import type { PeopleState } from './types'

export const initialState: PeopleState = {
  person: {} as Person,
  movies: [],
  tvShows: [],
  images: {
    data: [],
    open: false,
    active: {} as Image,
  },

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

  setActiveImage: () => null,
  openModalImage: () => null,
  closeModalImage: () => null,
}
