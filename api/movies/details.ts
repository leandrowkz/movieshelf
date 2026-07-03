import { tmdb, dispatch } from '../../src/lib/api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))

    const details = await tmdb.movies.details(showId)

    details.media_type = 'movie'

    return details
  })
