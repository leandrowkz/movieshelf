import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const { results } = await tmdb.movies.popular()

  return json(results)
}
