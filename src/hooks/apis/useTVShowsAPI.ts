import type { TVShow, TVShowCredits, TVShowItem, Video } from '@leandrowkz/tmdb'
import type { ListPaginated, UserShowStates } from 'src/types'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchTVShow(showId: number): Promise<TVShow> {
  const path = api.buildPath('/api/tv-shows/details', { showId })

  return api.get<TVShow>(path)
}

async function fetchCredits(showId: number): Promise<TVShowCredits> {
  const path = api.buildPath('/api/tv-shows/credits', { showId })

  return api.get<TVShowCredits>(path)
}

async function fetchVideos(showId: number): Promise<Video[]> {
  const path = api.buildPath('/api/tv-shows/videos', { showId })

  return api.get<Video[]>(path)
}

async function fetchStates(showId: number): Promise<UserShowStates> {
  const path = api.buildPath('/api/shows/states', { showId, showType: 'tv' })

  return api.get(path)
}

async function fetchListPopular(
  filters = {}
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/tv-shows/popular', filters)

  return api.get(path)
}

async function fetchListOnTheAir(
  filters = {}
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/tv-shows/on-the-air', filters)

  return api.get(path)
}

async function fetchListAiringToday(
  filters = {}
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/tv-shows/airing-today', filters)

  return api.get(path)
}

async function fetchListTopRated(
  filters = {}
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/tv-shows/top-rated', filters)

  return api.get(path)
}

async function fetchListSimilar(
  showId: number,
  filters = {}
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/tv-shows/similar', { ...filters, showId })

  return await api.get(path)
}

async function fetchListRecommended(
  showId: number,
  filters = {}
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/tv-shows/recommended', {
    ...filters,
    showId,
  })

  return api.get(path)
}

export const useTVShowsAPI = () => ({
  fetchTVShow,
  fetchVideos,
  fetchStates,
  fetchCredits,
  fetchListPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListOnTheAir,
  fetchListAiringToday,
  fetchListTopRated,
})
