import { tmdb, dispatch } from '../api'
import type { ShowType } from '../../src/types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))
    const showType = searchParams.get('showType') as ShowType

    const credits =
      showType === 'movie'
        ? await tmdb.movies.credits(showId)
        : await tmdb.tvShows.credits(showId)

    return credits
  })
