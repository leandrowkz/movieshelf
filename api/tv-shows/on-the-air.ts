import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const { results } = await tmdb.tvShows.onTheAir()

  return json(results)
}
