import { tmdb, dispatch } from '../api'
import { ShowType } from '../../types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))
    const showType = searchParams.get('showType') as ShowType

    const details =
      showType === 'movie'
        ? await tmdb.movies.details(showId)
        : await tmdb.tvShows.details(showId)

    details.media_type = showType

    return details
  })
