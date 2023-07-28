import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListFilters, ListPaginated } from 'src/types'

export type MovieListsState = {
  searchList: ListPaginated<MovieItem>
  similar: ListPaginated<MovieItem>
  popular: ListPaginated<MovieItem>
  trending: ListPaginated<MovieItem>
  recommended: ListPaginated<MovieItem>
  inTheatres: ListPaginated<MovieItem>
  bestComedies: ListPaginated<MovieItem>
  bestDocumentaries: ListPaginated<MovieItem>
  bestFamily: ListPaginated<MovieItem>
  bestScifiAndFantasy: ListPaginated<MovieItem>

  searchMovies: (filters?: ListFilters) => void
  fetchPopular: () => void
  fetchTrending: () => void
  fetchSimilar: (showId: number) => void
  fetchRecommended: (showId: number) => void
  fetchInTheatres: () => void
  fetchBestComedies: () => void
  fetchBestDocumentaries: () => void
  fetchBestFamily: () => void
  fetchBestScifiAndFantasy: () => void
}
