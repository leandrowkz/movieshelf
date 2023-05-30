import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('tvShowId'))
  const seasonNumber = Number(searchParams.get('seasonNumber'))

  const season = await tmdb.tvSeasons.details(id, seasonNumber)

  return json(season)
}
