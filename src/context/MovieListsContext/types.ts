import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListPaginated } from 'src/types'

export type MovieListsState = {
  search: ListPaginated<MovieItem>
  similar: ListPaginated<MovieItem>
  popular: ListPaginated<MovieItem>
  trending: ListPaginated<MovieItem>
  recommended: ListPaginated<MovieItem>
  inTheatres: ListPaginated<MovieItem>
  bestComedies: ListPaginated<MovieItem>
  bestDocumentaries: ListPaginated<MovieItem>
  bestFamily: ListPaginated<MovieItem>
  bestScifiAndFantasy: ListPaginated<MovieItem>

  fetchSearch: () => void
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
