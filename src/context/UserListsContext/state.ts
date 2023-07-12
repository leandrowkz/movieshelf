import type { UserListsState } from './types'
import type { UserShowStates } from 'src/types'

export const initialState: UserListsState = {
  favorites: {
    movies: {
      data: [],
      page: 0,
      pages: 0,
      count: 0,
      isLoading: false,
      hasErrors: false,
    },
    tvShows: {
      data: [],
      page: 0,
      pages: 0,
      count: 0,
      isLoading: false,
      hasErrors: false,
    },
  },

  watchlist: {
    movies: {
      data: [],
      page: 0,
      pages: 0,
      count: 0,
      isLoading: false,
      hasErrors: false,
    },
    tvShows: {
      data: [],
      page: 0,
      pages: 0,
      count: 0,
      isLoading: false,
      hasErrors: false,
    },
  },

  watched: {
    movies: {
      data: [],
      page: 0,
      pages: 0,
      count: 0,
      isLoading: false,
      hasErrors: false,
    },
    tvShows: {
      data: [],
      page: 0,
      pages: 0,
      count: 0,
      isLoading: false,
      hasErrors: false,
    },
  },

  isLoading: {
    fetchList: false,
    favorites: false,
    watchlist: false,
    watched: false,
  },

  fetchList: () => Promise.resolve(),
  addToList: () => Promise.resolve({} as UserShowStates),
  removeFromList: () => Promise.resolve({} as UserShowStates),
}
