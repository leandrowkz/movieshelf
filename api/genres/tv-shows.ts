import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async () => {
  const { genres } = await tmdb.genres.tv()

  return json(genres)
}
