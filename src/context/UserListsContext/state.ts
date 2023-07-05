import { UserListsState } from './types'

export const initialState: UserListsState = {
  favorites: {
    movies: {
      data: [],
      page: 0,
      pages: 0,
      isLoading: false,
      hasErrors: false,
    },
    tvShows: {
      data: [],
      page: 0,
      pages: 0,
      isLoading: false,
      hasErrors: false,
    },
  },

  watchlist: {
    movies: {
      data: [],
      page: 0,
      pages: 0,
      isLoading: false,
      hasErrors: false,
    },
    tvShows: {
      data: [],
      page: 0,
      pages: 0,
      isLoading: false,
      hasErrors: false,
    },
  },

  isLoading: {
    fetchList: false,
    addToList: false,
    removeFromList: false,
  },

  fetchList: () => Promise.resolve(),
  addToList: () => Promise.resolve(),
  removeFromList: () => Promise.resolve(),
}
