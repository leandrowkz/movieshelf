import type { Genre } from '@leandrowkz/tmdb'
import { APIClient } from './APIClient'

const api = new APIClient('')

async function fetchMoviesGenres(): Promise<Genre[]> {
  const path = api.buildPath('/api/genres/movies')

  return api.get<Genre[]>(path)
}

async function fetchTVShowsGenres(): Promise<Genre[]> {
  const path = api.buildPath('/api/genres/tv-shows')

  return api.get<Genre[]>(path)
}

export default {
  fetchMoviesGenres,
  fetchTVShowsGenres,
}
