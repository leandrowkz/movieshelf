import { tmdb, dispatch } from '../api'
import type { ShowType } from '../../src/types'
import { transformListResponse } from './helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page') || 1)
    const showId = Number(searchParams.get('showId'))
    const showType = searchParams.get('showType') as ShowType

    const response =
      showType === 'movie'
        ? await tmdb.movies.recommendations(showId, { page })
        : await tmdb.tvShows.recommendations(showId, { page })

    return transformListResponse(response, showType)
  })
