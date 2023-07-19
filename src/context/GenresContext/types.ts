import type { Genre, GenreCode, MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from 'src/types'

export type GenresState = {
  moviesGenresList: ListPaginated<MovieItem>
  moviesGenresLists: ListByGenre<ListPaginated<MovieItem>>[]
  moviesGenresCodes: Genre[]

  tvShowsGenresList: ListPaginated<TVShowItem>
  tvShowsGenresLists: ListByGenre<ListPaginated<TVShowItem>>[]
  tvShowsGenresCodes: Genre[]

  isLoading: {
    fetchMoviesGenresList: boolean
    fetchMoviesGenresLists: boolean
    fetchMoviesGenresCodes: boolean

    fetchTVShowsGenresList: boolean
    fetchTVShowsGenresLists: boolean
    fetchTVShowsGenresCodes: boolean
  }

  hasErrors: {
    fetchMoviesGenresList: boolean
    fetchMoviesGenresLists: boolean
    fetchMoviesGenresCodes: boolean

    fetchTVShowsGenresList: boolean
    fetchTVShowsGenresLists: boolean
    fetchTVShowsGenresCodes: boolean
  }

  fetchMoviesGenresList: (
    genreId: number,
    filters?: Record<string, string | number>
  ) => void
  fetchMoviesGenresLists: (genres: GenreCode[]) => void
  fetchMoviesGenresCodes: () => void

  fetchTVShowsGenresList: (
    genreId: number,
    filters?: Record<string, string | number>
  ) => void
  fetchTVShowsGenresLists: (genres: GenreCode[]) => void
  fetchTVShowsGenresCodes: () => void
}
