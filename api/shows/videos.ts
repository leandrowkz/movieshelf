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

    const { results } =
      showType === 'movie'
        ? await tmdb.movies.videos(showId)
        : await tmdb.tvShows.videos(showId)

    return results
  })
