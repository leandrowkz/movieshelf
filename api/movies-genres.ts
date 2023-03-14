import { json } from './jsonResponse'
import { api } from './tmdb/TmdbAPI'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const genresRaw = searchParams.get('genres') || ''
  const genres = genresRaw.split(',').map((genre) => Number(genre))

  const { results } = await api.discover.movies(genres)

  return json(results)
}
