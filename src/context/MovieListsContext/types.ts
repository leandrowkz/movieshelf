import type { Genre, MovieItem } from '@leandrowkz/tmdb'
import type { ListByGenre, ListPaginated } from 'src/types'

export type MovieListsState = {
  inTheatres: MovieItem[]
  trending: MovieItem[]
  similar: MovieItem[]
  recommended: MovieItem[]
  mostPopular: MovieItem[]
  bestComedies: MovieItem[]
  scifiAndFantasy: MovieItem[]
  topRatedDocumentaries: MovieItem[]
  family: MovieItem[]
  listsByGenres: ListByGenre<MovieItem>[]
  category: ListPaginated<MovieItem>

  isLoadingTrending: boolean
  isLoadingInTheatres: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean
  isLoadingMostPopular: boolean
  isLoadingBestComedies: boolean
  isLoadingScifiAndFantasy: boolean
  isLoadingFamily: boolean
  isLoadingTopRatedDocumentaries: boolean
  isLoadingByCategory: boolean
  isLoadingListsByGenres: boolean
  hasCategoryErrors: boolean

  fetchTrending: () => void
  fetchInTheatres: () => void
  fetchSimilar: (movieId: number) => void
  fetchRecommended: (movieId: number) => void
  fetchMostPopular: () => void
  fetchBestComedies: () => void
  fetchScifiAndFantasy: () => void
  fetchFamily: () => void
  fetchTopRatedDocumentaries: () => void
  fetchListCategory: (categoryId: number, page?: number) => void
  fetchListsByGenres: (genres: Genre[]) => void
}
