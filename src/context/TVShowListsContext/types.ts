import type { TVShowItem } from '@leandrowkz/tmdb'
import type { ListPaginated } from 'src/types'

export type TVShowListsState = {
  similar: ListPaginated<TVShowItem>
  popular: ListPaginated<TVShowItem>
  recommended: ListPaginated<TVShowItem>
  airingToday: ListPaginated<TVShowItem>
  onTheAir: ListPaginated<TVShowItem>
  topRated: ListPaginated<TVShowItem>

  fetchPopular: () => void
  fetchSimilar: (showId: number) => void
  fetchRecommended: (showId: number) => void
  fetchAiringToday: () => void
  fetchOnTheAir: () => void
  fetchTopRated: () => void
}
