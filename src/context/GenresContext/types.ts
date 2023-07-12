import type { Genre } from '@leandrowkz/tmdb'

export type GenresState = {
  moviesGenres: Genre[]
  tvShowsGenres: Genre[]
  isLoadingMoviesGenres: boolean
  isLoadingTVShowsGenres: boolean
  hasMoviesGenresErrors: boolean
  hasTVShowsGenresErrors: boolean
  fetchMoviesGenres: () => void
  fetchTVShowsGenres: () => void
}
