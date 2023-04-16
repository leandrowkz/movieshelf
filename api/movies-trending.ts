import { json, tmdb } from './api'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const filters = { media_type: <const>'movie', time_window: <const>'week' }
  const { results } = await tmdb.trending.movies(filters)

  return json(results)
}
