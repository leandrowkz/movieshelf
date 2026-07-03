import { tmdb, dispatch } from '../../src/lib/api'
import { transformListResponse } from '../../src/lib/helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page') || 1)

    const response = await tmdb.tvShows.airingToday({ page })

    return transformListResponse(response, 'tv')
  })
