import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ListPaginated } from 'src/types/ListPaginated'
import { ListType } from 'src/types/ListType'
import { ShowType } from 'src/types/ShowType'

export type UserListsState = {
  favorites: {
    movies: ListPaginated<MovieItem>
    tvShows: ListPaginated<TVShowItem>
  }
  watchlist: {
    movies: ListPaginated<MovieItem>
    tvShows: ListPaginated<TVShowItem>
  }

  isLoading: {
    fetchList: boolean
    addToList: boolean
    removeFromList: boolean
  }

  fetchList: (
    page: number,
    listType: ListType,
    showType: ShowType
  ) => Promise<void>

  addToList: (
    listType: ListType,
    showId: number,
    showType: ShowType
  ) => Promise<void>

  removeFromList: (
    listType: ListType,
    showId: number,
    showType: ShowType
  ) => Promise<void>
}

export type ListsState = Partial<
  UserListsState['favorites' | 'watchlist']['movies' | 'tvShows']
>
