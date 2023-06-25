import { FavoritesState } from './types'

export const initialState: FavoritesState = {
  movies: [],
  tvShows: [],
  isLoadingMoviesFavorites: false,
  isLoadingTVShowsFavorites: false,
  isLoadingAddFavorite: false,
  isLoadingRemoveFavorite: false,
  hasAddFavoriteErrors: false,
  hasRemoveFavoriteErrors: false,
  hasMoviesFavoritesErrors: false,
  hasTVShowsFavoritesErrors: false,
  fetchMoviesFavorites: () => null,
  fetchTVShowsFavorites: () => null,
  addFavorite: () => Promise.resolve(),
  removeFavorite: () => Promise.resolve(),
}
