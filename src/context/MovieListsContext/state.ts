import type { MovieListsState } from './types'
import { useHelpers } from 'src/hooks/useHelpers'

const { getEmptyListPaginated } = useHelpers()

export const initialState: MovieListsState = {
  searchList: getEmptyListPaginated(),
  similar: getEmptyListPaginated(),
  popular: getEmptyListPaginated(),
  trending: getEmptyListPaginated(),
  recommended: getEmptyListPaginated(),
  inTheatres: getEmptyListPaginated(),
  bestComedies: getEmptyListPaginated(),
  bestDocumentaries: getEmptyListPaginated(),
  bestFamily: getEmptyListPaginated(),
  bestScifiAndFantasy: getEmptyListPaginated(),

  searchMovies: () => null,
  fetchSimilar: () => null,
  fetchPopular: () => null,
  fetchTrending: () => null,
  fetchRecommended: () => null,
  fetchInTheatres: () => null,
  fetchBestComedies: () => null,
  fetchBestDocumentaries: () => null,
  fetchBestScifiAndFantasy: () => null,
  fetchBestFamily: () => null,
}
