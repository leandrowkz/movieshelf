import { json } from './jsonResponse'
import { api } from './tmdb/TmdbAPI'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const { genres } = await api.genres.movie()

  return json(genres)
}
