import { TmdbTimeWindow } from '../src/types/TmdbTimeWindow'
import { json } from './jsonResponse'
import { api } from './tmdb/TmdbAPI'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const { results } = await api.trending.movies(TmdbTimeWindow.WEEK)

  return json(results)
}
