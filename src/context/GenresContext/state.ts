import { useHelpers } from 'src/hooks/useHelpers'
import type { GenresState } from './types'

const { getEmptyListPaginated } = useHelpers()

export const initialState: GenresState = {
  moviesGenresList: getEmptyListPaginated(),
  moviesGenresLists: [],
  moviesGenresCodes: [],

  tvShowsGenresList: getEmptyListPaginated(),
  tvShowsGenresLists: [],
  tvShowsGenresCodes: [],

  isLoading: {
    fetchMoviesGenresList: false,
    fetchMoviesGenresLists: false,
    fetchMoviesGenresCodes: false,

    fetchTVShowsGenresList: false,
    fetchTVShowsGenresLists: false,
    fetchTVShowsGenresCodes: false,
  },

  hasErrors: {
    fetchMoviesGenresList: false,
    fetchMoviesGenresLists: false,
    fetchMoviesGenresCodes: false,

    fetchTVShowsGenresList: false,
    fetchTVShowsGenresLists: false,
    fetchTVShowsGenresCodes: false,
  },

  fetchMoviesGenresList: () => null,
  fetchMoviesGenresLists: () => null,
  fetchMoviesGenresCodes: () => null,

  fetchTVShowsGenresList: () => null,
  fetchTVShowsGenresLists: () => null,
  fetchTVShowsGenresCodes: () => null,
}
