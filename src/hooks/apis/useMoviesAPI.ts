import type { MovieItem, Movie, Video, MovieCredits } from '@leandrowkz/tmdb'
import type { ListPaginated, UserShowStates } from 'src/types'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchMovie(showId: number): Promise<Movie> {
  const path = api.buildPath('/api/movies/details', { showId })

  return api.get<Movie>(path)
}

async function fetchCredits(showId: number): Promise<MovieCredits> {
  const path = api.buildPath('/api/movies/credits', { showId })

  return api.get<MovieCredits>(path)
}

async function fetchVideos(showId: number): Promise<Video[]> {
  const path = api.buildPath('/api/movies/videos', { showId })

  return api.get<Video[]>(path)
}

async function fetchStates(showId: number): Promise<UserShowStates> {
  const path = api.buildPath('/api/movies/states', { showId })

  return api.get(path)
}

async function fetchListSimilar(
  showId: number,
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/movies/similar', { ...filters, showId })

  return await api.get(path)
}

async function fetchListRecommended(
  showId: number,
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/movies/recommended', { ...filters, showId })

  return api.get(path)
}

async function fetchListSearch(
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/movies/search', filters)

  return api.get(path)
}

async function fetchListInTheatres(
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/movies/in-theatres', filters)

  return api.get(path)
}

async function fetchListPopular(
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/movies/popular', filters)

  return api.get(path)
}

async function fetchListTrending(
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/movies/trending', filters)

  return api.get(path)
}

async function fetchListDiscover(
  filters = {}
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/movies/discover', filters)

  return api.get(path)
}

export const useMoviesAPI = () => ({
  fetchMovie,
  fetchCredits,
  fetchVideos,
  fetchStates,
  fetchListSearch,
  fetchListInTheatres,
  fetchListPopular,
  fetchListRecommended,
  fetchListSimilar,
  fetchListTrending,
  fetchListDiscover,
})
