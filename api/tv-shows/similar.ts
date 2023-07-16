import { tmdb, dispatch } from '../api'
import { transformListResponse } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))
    const page = Number(searchParams.get('page') || 1)

    const response = await tmdb.tvShows.similar(showId, { page })

    return transformListResponse(response, 'tv')
  })
