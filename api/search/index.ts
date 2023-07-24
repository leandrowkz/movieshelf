import { tmdb, dispatch } from '../api'
import { transformListResponse } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const query = String(searchParams.get('query'))

    const response = await tmdb.search.multiSearch({ query })

    return transformListResponse(response)
  })
