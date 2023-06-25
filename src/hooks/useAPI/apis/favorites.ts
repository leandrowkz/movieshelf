import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ShowType } from 'src/types/ShowType'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchMovieFavorites(): Promise<MovieItem[]> {
  const path = api.buildPath('/api/favorites/movies')

  return api.get<MovieItem[]>(path)
}

async function fetchTVShowsFavorites(): Promise<TVShowItem[]> {
  const path = api.buildPath('/api/favorites/tv-shows')

  return api.get<TVShowItem[]>(path)
}

async function addFavorite(showId: number, showType: ShowType) {
  const path = api.buildPath('/api/favorites/add')

  return api.post(path, { showId, showType })
}

async function removeFavorite(showId: number, showType: ShowType) {
  const path = api.buildPath('/api/favorites/remove')

  return api.post(path, { showId, showType })
}

export default {
  addFavorite,
  removeFavorite,
  fetchMovieFavorites,
  fetchTVShowsFavorites,
}
