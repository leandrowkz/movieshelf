import type { TVShowListsState } from './types'
import { useHelpers } from 'src/hooks/useHelpers'

const { getEmptyListPaginated } = useHelpers()

export const initialState: TVShowListsState = {
  similar: getEmptyListPaginated(),
  popular: getEmptyListPaginated(),
  recommended: getEmptyListPaginated(),
  airingToday: getEmptyListPaginated(),
  onTheAir: getEmptyListPaginated(),
  topRated: getEmptyListPaginated(),

  fetchPopular: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchAiringToday: () => null,
  fetchOnTheAir: () => null,
  fetchTopRated: () => null,
}
