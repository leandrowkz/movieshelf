import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ListPaginated } from 'src/types/ListPaginated'
import { ShowType } from 'src/types/ShowType'

export type FavoritesState = {
  movies: ListPaginated<MovieItem>
  tvShows: ListPaginated<TVShowItem>
  isLoadingAddFavorite: boolean
  isLoadingRemoveFavorite: boolean
  hasAddFavoriteErrors: boolean
  hasRemoveFavoriteErrors: boolean
  fetchMoviesFavorites: (page: number) => void
  fetchTVShowsFavorites: (page: number) => void
  addFavorite: (showId: number, showType: ShowType) => Promise<void>
  removeFavorite: (showId: number, showType: ShowType) => Promise<void>
}
