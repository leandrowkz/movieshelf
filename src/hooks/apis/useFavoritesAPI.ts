import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { ShowType } from 'src/types/ShowType'
import { APIClient } from './APIClient'
import { ListPaginated } from 'src/types/ListPaginated'

const api = new APIClient('')

async function fetchMovieFavorites(
  page = 1
): Promise<ListPaginated<MovieItem>> {
  const path = api.buildPath('/api/favorites/movies', { page })

  return api.get(path)
}

async function fetchTVShowsFavorites(
  page = 1
): Promise<ListPaginated<TVShowItem>> {
  const path = api.buildPath('/api/favorites/tv-shows', { page })

  return api.get(path)
}

async function addFavorite(showId: number, showType: ShowType) {
  const path = api.buildPath('/api/favorites/add')

  return api.post(path, { showId, showType })
}

async function removeFavorite(showId: number, showType: ShowType) {
  const path = api.buildPath('/api/favorites/remove')

  return api.post(path, { showId, showType })
}

export const useFavoritesAPI = () => ({
  addFavorite,
  removeFavorite,
  fetchMovieFavorites,
  fetchTVShowsFavorites,
})
