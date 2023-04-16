import { json, tmdb } from './api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)

  const filters = Object.fromEntries(searchParams.entries())

  const { results } = await tmdb.discover.movies(filters)

  return json(results)
}
