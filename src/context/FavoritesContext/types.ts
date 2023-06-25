import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ShowType } from 'src/types/ShowType'

export type FavoritesState = {
  movies: MovieItem[]
  tvShows: TVShowItem[]
  isLoadingMoviesFavorites: boolean
  isLoadingTVShowsFavorites: boolean
  isLoadingAddFavorite: boolean
  isLoadingRemoveFavorite: boolean
  hasMoviesFavoritesErrors: boolean
  hasTVShowsFavoritesErrors: boolean
  hasAddFavoriteErrors: boolean
  hasRemoveFavoriteErrors: boolean
  fetchMoviesFavorites: () => void
  fetchTVShowsFavorites: () => void
  addFavorite: (showId: number, showType: ShowType) => Promise<void>
  removeFavorite: (showId: number, showType: ShowType) => Promise<void>
}
