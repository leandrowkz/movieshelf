import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated, ShowType } from 'src/types'

export type ShowListsState = {
  movies: {
    listsByGenres: ListByGenre<MovieItem>[]
    similar: ListPaginated<MovieItem>
    popular: ListPaginated<MovieItem>
    recommended: ListPaginated<MovieItem>
    inTheatres: ListPaginated<MovieItem>
    bestComedies: ListPaginated<MovieItem>
    bestDocumentaries: ListPaginated<MovieItem>
    bestScifiAndFantasy: ListPaginated<MovieItem>
    bestFamily: ListPaginated<MovieItem>
  }
  tv: {
    listsByGenres: ListByGenre<TVShowItem>[]
    similar: ListPaginated<TVShowItem>
    popular: ListPaginated<TVShowItem>
    recommended: ListPaginated<TVShowItem>
    airingToday: ListPaginated<TVShowItem>
    onTheAir: ListPaginated<TVShowItem>
    topRated: ListPaginated<TVShowItem>
  }

  isLoading: {
    fetchMoviesBestComedies: boolean
    fetchMoviesBestDocumentaries: boolean
    fetchMoviesBestScifiAndFantasy: boolean
    fetchMoviesBestFamily: boolean
    fetchMoviesInTheatres: boolean
    fetchTVShowsAiringToday: boolean
    fetchTVShowsOnTheAir: boolean
    fetchTVShowsTopRated: boolean
    fetchPopular: boolean
    fetchSimilar: boolean
    fetchRecommended: boolean
    fetchListsByGenres: boolean
  }

  hasErrors: {
    fetchMoviesBestComedies: boolean
    fetchMoviesBestDocumentaries: boolean
    fetchMoviesBestScifiAndFantasy: boolean
    fetchMoviesBestFamily: boolean
    fetchMoviesInTheatres: boolean
    fetchTVShowsAiringToday: boolean
    fetchTVShowsOnTheAir: boolean
    fetchTVShowsTopRated: boolean
    fetchPopular: boolean
    fetchSimilar: boolean
    fetchRecommended: boolean
    fetchListsByGenres: boolean
  }

  fetchMoviesBestComedies: () => void
  fetchMoviesBestDocumentaries: () => void
  fetchMoviesBestScifiAndFantasy: () => void
  fetchMoviesBestFamily: () => void
  fetchMoviesInTheatres: () => void

  fetchTVShowsAiringToday: () => void
  fetchTVShowsOnTheAir: () => void
  fetchTVShowsTopRated: () => void

  fetchPopular: (showType: ShowType) => void
  fetchSimilar: (showId: number, showType: ShowType) => void
  fetchRecommended: (showId: number, showType: ShowType) => void
  fetchListsByGenres: (showType: ShowType) => void
}
