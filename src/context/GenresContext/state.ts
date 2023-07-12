import type { GenresState } from './types'

export const initialState: GenresState = {
  moviesGenres: [],
  tvShowsGenres: [],
  isLoadingMoviesGenres: false,
  isLoadingTVShowsGenres: false,
  hasMoviesGenresErrors: false,
  hasTVShowsGenresErrors: false,
  fetchMoviesGenres: () => null,
  fetchTVShowsGenres: () => null,
}
