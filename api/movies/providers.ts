import type { CountryCode } from '@leandrowkz/tmdb'
import { tmdb, dispatch } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const showId = Number(searchParams.get('showId'))
    const country = String(
      searchParams.get('country')
    ).toUpperCase() as CountryCode

    const { results } = await tmdb.movies.watchProviders(showId)

    if (!country || !results[country]) {
      return []
    }

    const providers = results[country]

    return providers
  })
