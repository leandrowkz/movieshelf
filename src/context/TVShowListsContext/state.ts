import { TVShowListsState } from './types'

export const initialState: TVShowListsState = {
  airingToday: [],
  onTheAir: [],
  popular: [],
  topRated: [],
  similar: [],
  recommended: [],
  listsByGenres: [],
  genre: [],

  isLoadingAiringToday: false,
  isLoadingOnTheAir: false,
  isLoadingPopular: false,
  isLoadingTopRated: false,
  isLoadingSimilar: false,
  isLoadingRecommended: false,
  isLoadingListsByGenres: false,
  isLoadingByGenre: false,

  hasGenreErrors: false,

  fetchAiringToday: () => null,
  fetchOnTheAir: () => null,
  fetchPopular: () => null,
  fetchTopRated: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchByGenre: () => null,
  fetchListsByGenres: () => null,
}
