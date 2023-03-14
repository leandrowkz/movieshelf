import { json } from './jsonResponse'
import { api } from './tmdb/TmdbAPI'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const { results } = await api.movies.nowPlaying()

  return json(results)
}
