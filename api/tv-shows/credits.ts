import { tmdb, dispatch } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))

    const credits = await tmdb.tvShows.credits(showId)

    return credits
  })
