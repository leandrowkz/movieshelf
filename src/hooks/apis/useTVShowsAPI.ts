import type {
  TVShow,
  TVShowAccountStates,
  TVShowCredits,
  TVShowItem,
  Video,
} from '@leandrowkz/tmdb'
import { ListByGenre } from 'src/types/ListByGenre'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchDetails(tvShowId: number): Promise<TVShow> {
  const path = api.buildPath('/api/tv-shows/details', { tvShowId })

  return api.get<TVShow>(path)
}

async function fetchListPopular(): Promise<TVShowItem[]> {
  const path = api.buildPath('/api/tv-shows/popular')

  return api.get<TVShowItem[]>(path)
}

async function fetchListOnTheAir(): Promise<TVShowItem[]> {
  const path = api.buildPath('/api/tv-shows/on-the-air')

  return api.get<TVShowItem[]>(path)
}

async function fetchListAiringToday(): Promise<TVShowItem[]> {
  const path = api.buildPath('/api/tv-shows/airing-today')

  return api.get<TVShowItem[]>(path)
}

async function fetchListTopRated(): Promise<TVShowItem[]> {
  const path = api.buildPath('/api/tv-shows/top-rated')

  return api.get<TVShowItem[]>(path)
}

async function fetchListSimilar(tvShowId: number): Promise<TVShowItem[]> {
  const path = api.buildPath('/api/tv-shows/similar', { tvShowId })

  return await api.get<TVShowItem[]>(path)
}

async function fetchListRecommended(tvShowId: number): Promise<TVShowItem[]> {
  const path = api.buildPath('/api/tv-shows/recommended', { tvShowId })

  return api.get<TVShowItem[]>(path)
}

async function fetchListByGenre(
  genres: number[],
  filters = {}
): Promise<TVShowItem[]> {
  const fetchFilters = {
    with_genres: genres.join(','),
    ...filters,
  }
  const path = api.buildPath('api/tv-shows/by-genre', fetchFilters)

  return api.get<TVShowItem[]>(path)
}

async function fetchListsByGenres(
  genres: number[]
): Promise<ListByGenre<TVShowItem>[]> {
  const fetchFilters = { with_genres: genres.join(',') }
  const path = api.buildPath('api/tv-shows/lists-by-genres', fetchFilters)

  return api.get<ListByGenre<TVShowItem>[]>(path)
}

async function fetchCredits(tvShowId: number): Promise<TVShowCredits> {
  const path = api.buildPath('/api/tv-shows/credits', { tvShowId })

  return api.get<TVShowCredits>(path)
}

async function fetchVideos(tvShowId: number): Promise<Video[]> {
  const path = api.buildPath('/api/tv-shows/videos', { tvShowId })

  return api.get<Video[]>(path)
}

async function fetchAccountStates(
  tvShowId: number
): Promise<TVShowAccountStates> {
  const path = api.buildPath('/api/tv-shows/account-states', { tvShowId })

  return api.get<TVShowAccountStates>(path)
}

export const useTVShowsAPI = () => ({
  fetchAccountStates,
  fetchCredits,
  fetchDetails,
  fetchListByGenre,
  fetchListPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListsByGenres,
  fetchListOnTheAir,
  fetchListAiringToday,
  fetchListTopRated,
  fetchVideos,
})
