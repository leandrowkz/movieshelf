import type { MovieItem } from '@leandrowkz/tmdb'
import type { ListPaginated } from 'src/types'

export type MovieListsState = {
  similar: ListPaginated<MovieItem>
  popular: ListPaginated<MovieItem>
  recommended: ListPaginated<MovieItem>
  inTheatres: ListPaginated<MovieItem>
  bestComedies: ListPaginated<MovieItem>
  bestDocumentaries: ListPaginated<MovieItem>
  bestFamily: ListPaginated<MovieItem>
  bestScifiAndFantasy: ListPaginated<MovieItem>

  isLoading: {
    fetchSimilar: boolean
    fetchPopular: boolean
    fetchRecommended: boolean
    fetchInTheatres: boolean
    fetchBestComedies: boolean
    fetchBestDocumentaries: boolean
    fetchBestFamily: boolean
    fetchBestScifiAndFantasy: boolean
  }

  hasErrors: {
    fetchSimilar: boolean
    fetchPopular: boolean
    fetchRecommended: boolean
    fetchInTheatres: boolean
    fetchBestComedies: boolean
    fetchBestDocumentaries: boolean
    fetchBestFamily: boolean
    fetchBestScifiAndFantasy: boolean
  }

  fetchSimilar: (showId: number) => void
  fetchPopular: () => void
  fetchRecommended: (showId: number) => void
  fetchInTheatres: () => void
  fetchBestComedies: () => void
  fetchBestDocumentaries: () => void
  fetchBestFamily: () => void
  fetchBestScifiAndFantasy: () => void
}
