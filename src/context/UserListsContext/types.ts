import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import type {
  ListPaginated,
  ShowType,
  UserListType,
  UserShowStates,
} from 'types'

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
    favorites: boolean
    watchlist: boolean
    watched: boolean
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
  ) => Promise<UserShowStates>

  removeFromList: (
    listType: UserListType,
    showId: number,
    showType: ShowType
  ) => Promise<UserShowStates>
}

export type ListsState = Partial<
  UserListsState['favorites' | 'watchlist' | 'watched']['movies' | 'tvShows']
>
