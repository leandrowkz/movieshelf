import { json } from './jsonResponse'
import { api } from './tmdb'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))

  const response = await api.fetchMovieDetails(id)

  return json(response)
}
