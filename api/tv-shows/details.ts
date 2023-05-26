import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('tvShowId'))

  const tvShow = await tmdb.tvShows.details(id)

  return json(tvShow)
}
