import type { ShowListsState } from './types'
import { useHelpers } from 'src/hooks/useHelpers'

const { getEmptyListPaginated } = useHelpers()

export const initialState: ShowListsState = {
  movies: {
    listsByGenres: [],
    similar: getEmptyListPaginated(),
    popular: getEmptyListPaginated(),
    recommended: getEmptyListPaginated(),
    inTheatres: getEmptyListPaginated(),
    bestComedies: getEmptyListPaginated(),
    bestDocumentaries: getEmptyListPaginated(),
    bestScifiAndFantasy: getEmptyListPaginated(),
    bestFamily: getEmptyListPaginated(),
  },
  tv: {
    listsByGenres: [],
    similar: getEmptyListPaginated(),
    popular: getEmptyListPaginated(),
    recommended: getEmptyListPaginated(),
    airingToday: getEmptyListPaginated(),
    onTheAir: getEmptyListPaginated(),
    topRated: getEmptyListPaginated(),
  },

  isLoading: {
    fetchMoviesBestComedies: false,
    fetchMoviesBestDocumentaries: false,
    fetchMoviesBestScifiAndFantasy: false,
    fetchMoviesBestFamily: false,
    fetchMoviesInTheatres: false,
    fetchTVShowsAiringToday: false,
    fetchTVShowsOnTheAir: false,
    fetchTVShowsTopRated: false,
    fetchPopular: false,
    fetchSimilar: false,
    fetchRecommended: false,
    fetchListsByGenres: false,
  },

  hasErrors: {
    fetchMoviesBestComedies: false,
    fetchMoviesBestDocumentaries: false,
    fetchMoviesBestScifiAndFantasy: false,
    fetchMoviesBestFamily: false,
    fetchMoviesInTheatres: false,
    fetchTVShowsAiringToday: false,
    fetchTVShowsOnTheAir: false,
    fetchTVShowsTopRated: false,
    fetchPopular: false,
    fetchSimilar: false,
    fetchRecommended: false,
    fetchListsByGenres: false,
  },

  fetchMoviesBestComedies: () => null,
  fetchMoviesBestDocumentaries: () => null,
  fetchMoviesBestScifiAndFantasy: () => null,
  fetchMoviesBestFamily: () => null,
  fetchMoviesInTheatres: () => null,

  fetchTVShowsAiringToday: () => null,
  fetchTVShowsOnTheAir: () => null,
  fetchTVShowsTopRated: () => null,

  fetchPopular: () => null,
  fetchSimilar: () => null,
  fetchRecommended: () => null,
  fetchListsByGenres: () => null,
}
