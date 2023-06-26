import { Genre, MovieItem } from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'

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
  category: MovieItem[]

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
  fetchByCategory: (categoryId: number) => void
  fetchListsByGenres: (genres: Genre[]) => void
}
