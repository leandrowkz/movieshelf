import type { Genre, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from 'types'

export type TVShowListsState = {
  airingToday: TVShowItem[]
  onTheAir: TVShowItem[]
  popular: TVShowItem[]
  topRated: TVShowItem[]
  similar: TVShowItem[]
  recommended: TVShowItem[]
  listsByGenres: ListByGenre<TVShowItem>[]
  category: ListPaginated<TVShowItem>

  isLoadingAiringToday: boolean
  isLoadingOnTheAir: boolean
  isLoadingPopular: boolean
  isLoadingTopRated: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean
  isLoadingListCategory: boolean
  isLoadingListsByGenres: boolean
  hasListCategoryErrors: boolean

  fetchAiringToday: () => void
  fetchOnTheAir: () => void
  fetchPopular: () => void
  fetchTopRated: () => void
  fetchSimilar: (tvShowId: number) => void
  fetchRecommended: (tvShowId: number) => void
  fetchListCategory: (categoryId: number, page?: number) => void
  fetchListsByGenres: (genres: Genre[]) => void
}
