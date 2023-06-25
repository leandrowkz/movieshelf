import { Genre, TVShowItem } from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'

export type TVShowListsState = {
  airingToday: TVShowItem[]
  onTheAir: TVShowItem[]
  popular: TVShowItem[]
  topRated: TVShowItem[]
  similar: TVShowItem[]
  recommended: TVShowItem[]
  listsByGenres: ListByGenre<TVShowItem>[]
  genre: TVShowItem[]

  isLoadingAiringToday: boolean
  isLoadingOnTheAir: boolean
  isLoadingPopular: boolean
  isLoadingTopRated: boolean
  isLoadingSimilar: boolean
  isLoadingRecommended: boolean
  isLoadingByGenre: boolean
  isLoadingListsByGenres: boolean
  hasGenreErrors: boolean

  fetchAiringToday: () => void
  fetchOnTheAir: () => void
  fetchPopular: () => void
  fetchTopRated: () => void
  fetchSimilar: (tvShowId: number) => void
  fetchRecommended: (tvShowId: number) => void
  fetchByGenre: (genreId: number) => void
  fetchListsByGenres: (genres: Genre[]) => void
}
