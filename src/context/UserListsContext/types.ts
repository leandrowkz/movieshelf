import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ListPaginated } from 'src/types/ListPaginated'
import { ShowType } from 'src/types/ShowType'
import { UserListType } from 'src/types/UserListType'

export type UserListsState = {
  favorites: {
    movies: ListPaginated<MovieItem>
    tvShows: ListPaginated<TVShowItem>
  }
  watchlist: {
    movies: ListPaginated<MovieItem>
    tvShows: ListPaginated<TVShowItem>
  }
  watched: {
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
    listType: UserListType,
    showType: ShowType
  ) => Promise<void>

  addToList: (
    listType: UserListType,
    showId: number,
    showType: ShowType
  ) => Promise<void>

  removeFromList: (
    listType: UserListType,
    showId: number,
    showType: ShowType
  ) => Promise<void>
}

export type ListsState = Partial<
  UserListsState['favorites' | 'watchlist' | 'watched']['movies' | 'tvShows']
>
