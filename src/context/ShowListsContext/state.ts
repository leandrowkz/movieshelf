import { ShowListsState } from './types'

export const initialState: ShowListsState = {
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
    fetchShowList: false,
    addToList: false,
    removeFromList: false,
  },

  fetchShowList: () => Promise.resolve(),
  addToList: () => Promise.resolve(),
  removeFromList: () => Promise.resolve(),
}
