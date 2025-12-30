import { tmdb, dispatch } from '../../src/lib/api'
import { transformListResponse } from '../../src/lib/helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))
    const page = Number(searchParams.get('page') || 1)

    const response = await tmdb.movies.similar(showId, { page })

    return transformListResponse(response, 'movie')
  })
