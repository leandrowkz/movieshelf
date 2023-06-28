import { FavoritesState } from './types'

export const initialState: FavoritesState = {
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
  isLoadingAddFavorite: false,
  isLoadingRemoveFavorite: false,
  hasAddFavoriteErrors: false,
  hasRemoveFavoriteErrors: false,
  fetchMoviesFavorites: () => null,
  fetchTVShowsFavorites: () => null,
  addFavorite: () => Promise.resolve(),
  removeFavorite: () => Promise.resolve(),
}
