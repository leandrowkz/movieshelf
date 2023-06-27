import { TVShowListsState } from './types'

export const initialState: TVShowListsState = {
  airingToday: [],
  onTheAir: [],
  popular: [],
  topRated: [],
  similar: [],
  recommended: [],
  listsByGenres: [],
  category: {
    data: [],
    page: 0,
    pages: 0,
  },

  isLoadingAiringToday: false,
  isLoadingOnTheAir: false,
  isLoadingPopular: false,
  isLoadingTopRated: false,
  isLoadingSimilar: false,
  isLoadingRecommended: false,
  isLoadingListsByGenres: false,
  isLoadingListCategory: false,

  hasListCategoryErrors: false,

  fetchAiringToday: () => null,
  fetchOnTheAir: () => null,
  fetchPopular: () => null,
  fetchTopRated: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchListCategory: () => null,
  fetchListsByGenres: () => null,
}
