import type { CountryCode } from '@leandrowkz/tmdb'
import { tmdb, dispatch } from '../api'
import { getWatchProvidersList } from '../helpers'

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

    const response = await tmdb.tvShows.watchProviders(showId)

    return getWatchProvidersList(response, country)
  })
