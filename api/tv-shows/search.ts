import { dispatch, tmdb } from '../../src/lib/api'
import { transformListResponse } from '../../src/lib/helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const query = String(searchParams.get('query'))

    const response = await tmdb.search.tvShows({ query })

    return transformListResponse(response, 'tv')
  })
