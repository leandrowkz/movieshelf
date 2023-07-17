import type { MovieListsState } from './types'
import { useHelpers } from 'src/hooks/useHelpers'

const { getEmptyListPaginated } = useHelpers()

export const initialState: MovieListsState = {
  similar: getEmptyListPaginated(),
  popular: getEmptyListPaginated(),
  recommended: getEmptyListPaginated(),
  inTheatres: getEmptyListPaginated(),
  bestComedies: getEmptyListPaginated(),
  bestDocumentaries: getEmptyListPaginated(),
  bestFamily: getEmptyListPaginated(),
  bestScifiAndFantasy: getEmptyListPaginated(),

  isLoading: {
    fetchSimilar: false,
    fetchPopular: false,
    fetchRecommended: false,
    fetchInTheatres: false,
    fetchBestComedies: false,
    fetchBestDocumentaries: false,
    fetchBestFamily: false,
    fetchBestScifiAndFantasy: false,
  },

  hasErrors: {
    fetchSimilar: false,
    fetchPopular: false,
    fetchRecommended: false,
    fetchInTheatres: false,
    fetchBestComedies: false,
    fetchBestDocumentaries: false,
    fetchBestFamily: false,
    fetchBestScifiAndFantasy: false,
  },

  fetchSimilar: () => null,
  fetchPopular: () => null,
  fetchRecommended: () => null,
  fetchInTheatres: () => null,
  fetchBestComedies: () => null,
  fetchBestDocumentaries: () => null,
  fetchBestScifiAndFantasy: () => null,
  fetchBestFamily: () => null,
}
