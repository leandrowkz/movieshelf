import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('tvShowId'))

  const { results } = await tmdb.tvShows.similar(id)

  return json(results)
}
