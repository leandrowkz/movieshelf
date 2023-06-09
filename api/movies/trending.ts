import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const { results } = await tmdb.trending.getTrending('movie', 'week')

  return json(results)
}
