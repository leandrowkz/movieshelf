import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ListPaginated } from 'src/types/ListPaginated'
import { ListType } from 'src/types/ListType'
import { ShowType } from 'src/types/ShowType'

export type ShowListsState = {
  favorites: {
    movies: ListPaginated<MovieItem>
    tvShows: ListPaginated<TVShowItem>
  }
  watchlist: {
    movies: ListPaginated<MovieItem>
    tvShows: ListPaginated<TVShowItem>
  }

  isLoading: {
    fetchShowList: boolean
    addToList: boolean
    removeFromList: boolean
  }

  fetchShowList: (
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
  ShowListsState['favorites' | 'watchlist']['movies' | 'tvShows']
>
